import mongoose, { Schema } from 'mongoose';

// Define the schema for recommended actions
const recommendedActionSchema = new Schema({
  actionId: {
    type: Number,
    required: true
    // Remove the unique constraint from here
  },
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Add a compound index to ensure the combination of actionId and userId is unique
recommendedActionSchema.index({ actionId: 1, userId: 1 }, { unique: true });

// Create and export the model
const RecommendedAction = mongoose.models.RecommendedAction || 
  mongoose.model('RecommendedAction', recommendedActionSchema);

export default RecommendedAction;
