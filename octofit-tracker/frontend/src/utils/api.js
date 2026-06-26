const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeResponse(data, key) {
  if (!data) {
    return []
  }

  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data[key])) {
    return data[key]
  }

  const arrayKey = Object.keys(data).find((name) => Array.isArray(data[name]))
  if (arrayKey) {
    return data[arrayKey]
  }

  if (Array.isArray(data.items)) {
    return data.items
  }

  if (Array.isArray(data.results)) {
    return data.results
  }

  return []
}

export async function fetchApiData(path, responseKey) {
  const url = `${API_BASE_URL}/${path}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()
  return normalizeResponse(data, responseKey)
}

export function getApiHostHint() {
  return CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000'
}
