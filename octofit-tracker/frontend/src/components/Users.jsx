import React, { useEffect, useState } from 'react'
import { fetchApiData } from '../utils/api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const API_PATH = '/api/users/'

  useEffect(() => {
    fetchApiData(API_PATH, 'users')
      .then(setUsers)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role || 'member'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
