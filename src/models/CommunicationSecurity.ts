import mongoose, { Schema } from 'mongoose';

// Define the interface for tracking detailed progress through security items
export interface IUserCommunicationSecurityProgress {
  userId: string;
  completedCategories: number[];
  lastUpdated: Date;
}

// Create the schema
const UserCommunicationSecurityProgressSchema = new Schema<IUserCommunicationSecurityProgress>({
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
export const UserCommunicationSecurityProgress = mongoose.models.UserCommunicationSecurityProgress || 
  mongoose.model<IUserCommunicationSecurityProgress>('UserCommunicationSecurityProgress', UserCommunicationSecurityProgressSchema);

export default UserCommunicationSecurityProgress;
