import mongoose, { Schema } from 'mongoose';

// Define the interface for tracking detailed progress through recommended security items
export interface IUserRecommendedSecurityProgress {
  userId: string;
  completedCategories: number[];
  lastUpdated: Date;
}

// Create the schema
const UserRecommendedSecurityProgressSchema = new Schema<IUserRecommendedSecurityProgress>({
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
export const UserRecommendedSecurityProgress = mongoose.models.UserRecommendedSecurityProgress || 
  mongoose.model<IUserRecommendedSecurityProgress>('UserRecommendedSecurityProgress', UserRecommendedSecurityProgressSchema);

export default UserRecommendedSecurityProgress;
