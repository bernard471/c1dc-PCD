import mongoose, { Schema } from 'mongoose';

// Define the interface for the document
export interface IUserSecurityCompletion {
  userId: string;
  completedCategories: number[];
  lastUpdated: Date;
}

// Create the schema
const UserSecurityCompletionSchema = new Schema<IUserSecurityCompletion>({
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
export const UserSecurityCompletion = mongoose.models.UserSecurityCompletion || 
  mongoose.model<IUserSecurityCompletion>('UserSecurityCompletion', UserSecurityCompletionSchema);

export default UserSecurityCompletion;
