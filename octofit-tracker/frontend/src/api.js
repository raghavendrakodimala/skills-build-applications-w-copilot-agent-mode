const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchCollection(endpoint, signal) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}/${endpoint}/`
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Unable to load ${endpoint} (${response.status})`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  return payload.results || payload.data || payload.items || []
}