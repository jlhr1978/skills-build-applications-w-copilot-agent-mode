import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB', MONGO_URI)
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
    throw err
  }
}

export default { connectDB }
