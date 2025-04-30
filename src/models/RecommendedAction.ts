import mongoose, { Schema } from 'mongoose';

// Define the schema for recommended actions
const recommendedActionSchema = new Schema({
  actionId: {
    type: Number,
    required: true,
    unique: true
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

// Create and export the model
const RecommendedAction = mongoose.models.RecommendedAction || 
  mongoose.model('RecommendedAction', recommendedActionSchema);

export default RecommendedAction;