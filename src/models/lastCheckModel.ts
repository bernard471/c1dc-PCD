import mongoose, { Schema } from 'mongoose';

const LastCheckSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  timestamp: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const LastCheck = mongoose.models.LastCheck || mongoose.model('LastCheck', LastCheckSchema);

export default LastCheck;
