import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const appHost = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function App() {
  return (
    <div className="container py-5">
      <header className="mb-4">
        <h1 className="display-5">OctoFit Tracker</h1>
        <p className="text-muted">
          API host: <code>{appHost}</code>
        </p>
      </header>

      <nav className="nav nav-pills mb-4">
        <Link className="nav-link" to="/users">
          Users
        </Link>
        <Link className="nav-link" to="/activities">
          Activities
        </Link>
        <Link className="nav-link" to="/teams">
          Teams
        </Link>
        <Link className="nav-link" to="/leaderboard">
          Leaderboard
        </Link>
        <Link className="nav-link" to="/workouts">
          Workouts
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate replace to="/users" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<p>Page not found.</p>} />
      </Routes>
    </div>
  )
}
