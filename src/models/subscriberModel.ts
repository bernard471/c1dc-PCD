import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for Subscriber document
export interface ISubscriber extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  lastNotifiedAt?: Date;
  unsubscribeToken: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema
const subscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    lastNotifiedAt: {
      type: Date,
      default: null,
    },
    unsubscribeToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Create and export the model
const Subscriber = mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', subscriberSchema);

export default Subscriber;