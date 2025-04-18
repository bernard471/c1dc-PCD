import mongoose, { Schema } from 'mongoose';

// Define the interface for tracking detailed progress through email security items
export interface IUserEmailSecurityProgress {
  userId: string;
  completedCategories: number[];
  lastUpdated: Date;
}

// Create the schema
const UserEmailSecurityProgressSchema = new Schema<IUserEmailSecurityProgress>({
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
export const UserEmailSecurityProgress = mongoose.models.UserEmailSecurityProgress || 
  mongoose.model<IUserEmailSecurityProgress>('UserEmailSecurityProgress', UserEmailSecurityProgressSchema);

export default UserEmailSecurityProgress;
