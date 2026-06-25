import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  role?: string
  team?: mongoose.Types.ObjectId
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' }
}, { timestamps: true })

export default mongoose.model<IUser>('User', UserSchema)
