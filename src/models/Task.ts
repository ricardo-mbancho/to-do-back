import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string
  createdAt: Date
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
)

export default mongoose.model<ITask>('Task', TaskSchema)