import express from 'express'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'
import { connectDB } from './config/database'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

const app = express()
app.use(express.json())

// Codespaces-aware API URL
const CODESPACE = process.env.CODESPACE_NAME
const API_BASE = CODESPACE
  ? `https://${CODESPACE}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`

app.get('/', (_req, res) => res.json({ message: 'OctoFit Tracker API', apiBase: API_BASE }))

// Mount API routers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => console.log('Server listening on port', PORT, 'API base:', API_BASE))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
