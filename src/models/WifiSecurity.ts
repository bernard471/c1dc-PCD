import mongoose, { Schema } from 'mongoose';

// Define the interface for tracking detailed progress through WiFi security items
export interface IUserWifiSecurityProgress {
  userId: string;
  completedCategories: number[];
  lastUpdated: Date;
}

// Create the schema
const UserWifiSecurityProgressSchema = new Schema<IUserWifiSecurityProgress>({
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
export const UserWifiSecurityProgress = mongoose.models.UserWifiSecurityProgress || 
  mongoose.model<IUserWifiSecurityProgress>('UserWifiSecurityProgress', UserWifiSecurityProgressSchema);

export default UserWifiSecurityProgress;
