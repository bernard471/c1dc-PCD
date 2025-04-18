import mongoose, { Schema } from 'mongoose';

// Define the interface for tracking detailed progress through mobile security items
export interface IUserMobileSecurityProgress {
  userId: string;
  completedCategories: {
    android: string[];
    ios: string[];
  };
  deviceType: 'android' | 'ios' | 'both' | null;
  lastUpdated: Date;
}

// Create the schema
const UserMobileSecurityProgressSchema = new Schema<IUserMobileSecurityProgress>({
  userId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  completedCategories: {
    android: {
      type: [String],
      default: []
    },
    ios: {
      type: [String],
      default: []
    }
  },
  deviceType: {
    type: String,
    enum: ['android', 'ios', 'both', null],
    default: null
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
export const UserMobileSecurityProgress = mongoose.models.UserMobileSecurityProgress || 
  mongoose.model<IUserMobileSecurityProgress>('UserMobileSecurityProgress', UserMobileSecurityProgressSchema);

export default UserMobileSecurityProgress;
