# OctoFit Tracker

Multi-tier OctoFit Tracker scaffold.

Ports:
- Frontend: 5173
- Backend: 8000
- MongoDB: 27017

Frontend: Vite + React 19
Backend: Node + Express + TypeScript + Mongoose

## Frontend environment

The React frontend uses Vite environment variables for API host configuration.

- `VITE_CODESPACE_NAME` must be defined for Codespaces deployment.
- In Codespaces, set it to your codespace name.
- If unset, the frontend falls back to `http://localhost:8000`.

A sample file is available at `octofit-tracker/frontend/.env.local.example`:

```env
VITE_CODESPACE_NAME=your_codespace_name
```
