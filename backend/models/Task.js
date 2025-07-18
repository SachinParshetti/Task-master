import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    description: String,
    completed: { type: Boolean, default: false }
  },
  { timestamps: true } // 👈 Adds createdAt and updatedAt automatically
);

export default mongoose.model('Task', taskSchema);
