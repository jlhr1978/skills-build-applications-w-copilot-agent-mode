import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  description?: string
  exercises: { name: string; reps?: number; sets?: number; durationSeconds?: number }[]
  durationMinutes?: number
  createdBy?: mongoose.Types.ObjectId
}

const WorkoutSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  exercises: [{ name: String, reps: Number, sets: Number, durationSeconds: Number }],
  durationMinutes: { type: Number },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

export default mongoose.model<IWorkout>('Workout', WorkoutSchema)
