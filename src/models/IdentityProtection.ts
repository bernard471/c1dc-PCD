import mongoose, { Schema } from 'mongoose';

// Define the interface for tracking detailed progress through identity protection items
export interface IUserIdentityProtectionProgress {
  userId: string;
  completedCategories: number[];
  lastUpdated: Date;
}

// Create the schema
const UserIdentityProtectionProgressSchema = new Schema<IUserIdentityProtectionProgress>({
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
export const UserIdentityProtectionProgress = mongoose.models.UserIdentityProtectionProgress || 
  mongoose.model<IUserIdentityProtectionProgress>('UserIdentityProtectionProgress', UserIdentityProtectionProgressSchema);

export default UserIdentityProtectionProgress;
