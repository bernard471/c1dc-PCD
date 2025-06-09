import mongoose from 'mongoose';

const UserExecutiveSecurityProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  completedCategories: {
    type: [Number],
    default: [],
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const UserExecutiveSecurityProgress = mongoose.models.UserExecutiveSecurityProgress || 
  mongoose.model('UserExecutiveSecurityProgress', UserExecutiveSecurityProgressSchema);

export default UserExecutiveSecurityProgress;
