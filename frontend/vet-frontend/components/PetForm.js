'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiPost } from '../lib/api'

export default function PetForm({ owners }) {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', species: '', breed: '', dob: '', owner_id: owners[0]?.id || '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = { ...form, dob: form.dob || null }
      await apiPost('/api/pets', payload)
      setForm({ name: '', species: '', breed: '', dob: '', owner_id: owners[0]?.id || '' })
      router.refresh()
    } catch (err) {
      setError(err.message || 'Error creating pet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">Add Pet</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input className="border p-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="border p-2" placeholder="Species" value={form.species} onChange={e=>setForm({...form, species:e.target.value})} required />
        <input className="border p-2" placeholder="Breed" value={form.breed} onChange={e=>setForm({...form, breed:e.target.value})} />
        <input className="border p-2" type="date" value={form.dob} onChange={e=>setForm({...form, dob:e.target.value})} />
        <select className="border p-2" value={form.owner_id} onChange={e=>setForm({...form, owner_id:e.target.value})}>
          {owners.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </div>
      <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
    </form>
  )
}

