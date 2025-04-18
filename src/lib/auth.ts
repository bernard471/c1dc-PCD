// Create a new file src/lib/auth.ts
import { DefaultSession, NextAuthOptions } from "next-auth";
import User from "@/models/userModel";
import connectDB from "@/dbConfig/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Move your type declarations here
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      subscriptionStatus?: string;
      hasCompletedPayment?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    subscriptionStatus?: string;
    hasCompletedPayment?: boolean;
  }
}

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  subscriptionStatus?: string;
  hasCompletedPayment?: boolean;
}

export const authOptions: NextAuthOptions = {
  // Copy all your auth options here
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }
  
          await connectDB();
  
          // Find user by email
          const user = await User.findOne({ email: credentials.email }).select("+password");
          
          if (!user) {
            throw new Error("No user found with this email");
          }
  
          // Check if it's a Google account
          if (user.isGoogleAccount) {
            throw new Error("Please use Google sign-in for this account");
          }
  
          // Verify password
          const isPasswordValid = await user.comparePassword(credentials.password);
          
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
  
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            subscriptionStatus: user.subscriptionStatus,
            hasCompletedPayment: user.hasCompletedPayment,
          };
        }
      })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        // Use the extended user type instead of any
        token.subscriptionStatus = (user as ExtendedUser).subscriptionStatus;
        token.hasCompletedPayment = (user as ExtendedUser).hasCompletedPayment;
      }

      // If it's a Google sign-in, check if the user exists in our database
      if (account && account.provider === "google") {
        await connectDB();
        
        const existingUser = await User.findOne({ email: token.email });
        
        if (!existingUser) {
          // Create a new user if they don't exist
          const newUser = await User.create({
            name: token.name,
            email: token.email,
            image: token.picture,
            isGoogleAccount: true,
            subscriptionStatus: 'none',
            hasCompletedPayment: false,
          });
          
          token.id = newUser._id.toString();
          token.subscriptionStatus = newUser.subscriptionStatus;
          token.hasCompletedPayment = newUser.hasCompletedPayment;
        } else {
          // Update existing user's Google-related info
          existingUser.name = token.name || existingUser.name;
          existingUser.image = token.picture || existingUser.image;
          existingUser.isGoogleAccount = true;
          await existingUser.save();
          
          token.id = existingUser._id.toString();
          token.subscriptionStatus = existingUser.subscriptionStatus;
          token.hasCompletedPayment = existingUser.hasCompletedPayment;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.subscriptionStatus = token.subscriptionStatus as string;
        session.user.hasCompletedPayment = token.hasCompletedPayment as boolean;
        
        // Add this: If token has updated subscription info, make sure it's reflected
        if (token.subscriptionStatus === 'active' && token.hasCompletedPayment === true) {
          session.user.subscriptionStatus = 'active';
          session.user.hasCompletedPayment = true;
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If the user is signing in and hasn't completed payment, redirect to payment page
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/payment`;
      }
      return url;
    }
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
