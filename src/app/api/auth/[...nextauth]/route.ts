import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Create the handler with the imported authOptions
const handler = NextAuth(authOptions);

// Export only the handler functions
export { handler as GET, handler as POST };
