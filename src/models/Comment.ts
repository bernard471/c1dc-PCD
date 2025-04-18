import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  postId: string;
  author: string;
  authorEmail?: string;
  authorImage?: string;
  content: string;
  createdAt: Date;
  likes: number;
  replies?: IComment[];
}

const ReplySchema = new Schema({
  author: { type: String, required: true },
  authorEmail: { type: String },
  authorImage: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }
});

const CommentSchema = new Schema({
  postId: { type: String, required: true, index: true },
  author: { type: String, required: true },
  authorEmail: { type: String },
  authorImage: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  replies: [ReplySchema]
});

// Check if the model already exists to prevent overwriting during hot reloads
export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
