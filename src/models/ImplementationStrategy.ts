import mongoose, { Schema } from 'mongoose';

// Define the interface for tracking detailed progress through implementation strategy items
export interface IUserImplementationStrategyProgress {
  userId: string;
  completedCategories: number[];
  lastUpdated: Date;
}

// Create the schema
const UserImplementationStrategyProgressSchema = new Schema<IUserImplementationStrategyProgress>({
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
export const UserImplementationStrategyProgress = mongoose.models.UserImplementationStrategyProgress || 
  mongoose.model<IUserImplementationStrategyProgress>('UserImplementationStrategyProgress', UserImplementationStrategyProgressSchema);

export default UserImplementationStrategyProgress;
