import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  isGoogleAccount: boolean;
  subscriptionStatus: 'none' | 'active' | 'expired';
  subscriptionExpiry?: Date;
  hasCompletedPayment: boolean;
  passwordUpdatedAt?: Date; // Add this field to the interface
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: function() {
        return !this.isGoogleAccount;
      },
      minlength: [6, 'Password should be at least 6 characters long'],
      select: false, // Don't return password by default in queries
    },
    image: {
      type: String,
      default: '',
    },
    isGoogleAccount: {
      type: Boolean,
      default: false,
    },
    subscriptionStatus: {
      type: String,
      enum: ['none', 'active', 'expired'],
      default: 'none',
    },
    subscriptionExpiry: {
      type: Date,
      default: null,
    },
    hasCompletedPayment: {
      type: Boolean,
      default: false,
    },
    passwordUpdatedAt: { // Add this field to the schema
      type: Date,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Update passwordUpdatedAt when password is changed
    if (this.isModified('password')) {
      this.passwordUpdatedAt = new Date();
    }
    
    next();
  } catch (error: Error | unknown) {
    next(error as mongoose.CallbackError);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the model
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
