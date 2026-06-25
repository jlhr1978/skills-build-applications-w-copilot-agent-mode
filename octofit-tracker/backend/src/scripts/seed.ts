/**
 * Seed the octofit_db database with test data
 *
 * Run with: `npm run seed` (from backend folder)
 */
import mongoose from 'mongoose'
import User from '../models/User'
import Team from '../models/Team'
import Activity from '../models/Activity'
import Workout from '../models/Workout'
import Leaderboard from '../models/Leaderboard'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO_URI)

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  // Teams
  const teamA = await Team.create({ name: 'Deep Sea Runners' })
  const teamB = await Team.create({ name: 'Coral Crushers' })

  // Users
  const users = await User.create([
    { name: 'Ava Lock', email: 'ava@example.com', role: 'captain', team: teamA._id },
    { name: 'Noah Reed', email: 'noah@example.com', role: 'member', team: teamA._id },
    { name: 'Maya Singh', email: 'maya@example.com', role: 'member', team: teamB._id }
  ])

  // Add members to teams
  teamA.members = [users[0]._id, users[1]._id]
  teamB.members = [users[2]._id]
  await teamA.save()
  await teamB.save()

  // Activities
  await Activity.create([
    { user: users[0]._id, type: 'run', durationMinutes: 35, calories: 320, date: new Date() },
    { user: users[1]._id, type: 'cycle', durationMinutes: 45, calories: 520, date: new Date() },
    { user: users[2]._id, type: 'swim', durationMinutes: 60, calories: 700, date: new Date() }
  ])

  // Workouts
  await Workout.create([
    { title: 'Quick Full Body', description: '20-minute HIIT', exercises: [{ name: 'Burpees', reps: 15, sets: 3 }, { name: 'Push-ups', reps: 12, sets: 3 }], durationMinutes: 20, createdBy: users[0]._id },
    { title: 'Endurance Ride', description: '45-min steady-state', exercises: [{ name: 'Cycle', durationSeconds: 2700 }], durationMinutes: 45, createdBy: users[1]._id }
  ])

  // Leaderboard
  await Leaderboard.create([
    { user: users[0]._id, score: 980, rank: 1 },
    { user: users[1]._id, score: 860, rank: 2 },
    { user: users[2]._id, score: 720, rank: 3 }
  ])

  console.log('Seeding complete')
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seed failed', err)
  process.exit(1)
})
