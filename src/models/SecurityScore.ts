import mongoose, { Schema } from 'mongoose';

// Define the interface for security domain scores
export interface ISecurityDomain {
  id: string;
  name: string;
  score: number;
  status: 'good' | 'warning' | 'danger';
}

// Define the interface for overall security scores
export interface ISecurityScore {
  userId: string;
  overallScore: number;
  securityDomains: ISecurityDomain[];
  lastUpdated: Date;
}

// Create the schema
const SecurityScoreSchema = new Schema<ISecurityScore>({
  userId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  overallScore: {
    type: Number,
    default: 0
  },
  securityDomains: [{
    id: String,
    name: String,
    score: Number,
    status: {
      type: String,
      enum: ['good', 'warning', 'danger'],
      default: 'danger'
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
export const SecurityScore = mongoose.models.SecurityScore || 
  mongoose.model<ISecurityScore>('SecurityScore', SecurityScoreSchema);

export default SecurityScore;
