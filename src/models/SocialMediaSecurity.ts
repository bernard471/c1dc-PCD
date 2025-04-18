import mongoose, { Schema } from 'mongoose';

// Define the interface for tracking detailed progress through social media security items
export interface IUserSocialMediaSecurityProgress {
  userId: string;
  completedCategories: number[];
  lastUpdated: Date;
}

// Create the schema
const UserSocialMediaSecurityProgressSchema = new Schema<IUserSocialMediaSecurityProgress>({
  userId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  completedCategories: {
    type: [Number],
    default: []
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
export const UserSocialMediaSecurityProgress = mongoose.models.UserSocialMediaSecurityProgress || 
  mongoose.model<IUserSocialMediaSecurityProgress>('UserSocialMediaSecurityProgress', UserSocialMediaSecurityProgressSchema);

export default UserSocialMediaSecurityProgress;
