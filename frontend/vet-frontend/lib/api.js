const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`GET ${path} failed`)
  return res.json()
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `POST ${path} failed`)
  }
  return res.json()
}

