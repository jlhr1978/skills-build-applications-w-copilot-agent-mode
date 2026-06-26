import React, { useEffect, useState } from 'react'
import { fetchApiData } from '../utils/api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchApiData('workouts', 'workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id}>
                  <td>{workout.title}</td>
                  <td>{workout.description || '—'}</td>
                  <td>{workout.durationMinutes ? `${workout.durationMinutes} min` : '—'}</td>
                  <td>{workout.createdBy?.name || workout.createdBy || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
