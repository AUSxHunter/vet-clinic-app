'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiPost } from '../lib/api'

export default function AppointmentForm({ pets, services }) {
  const router = useRouter()
  const [form, setForm] = useState({ pet_id: pets[0]?.id || '', vet_name: '', datetime: '', service_ids: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggleService(id) {
    setForm(prev => {
      const exists = prev.service_ids.includes(id)
      return { ...prev, service_ids: exists ? prev.service_ids.filter(s=>s!==id) : [...prev.service_ids, id] }
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await apiPost('/api/appointments', { ...form, pet_id: Number(form.pet_id), datetime: new Date(form.datetime).toISOString() })
      setForm({ pet_id: pets[0]?.id || '', vet_name: '', datetime: '', service_ids: [] })
      router.refresh()
    } catch (err) {
      setError(err.message || 'Error creating appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">Schedule Appointment</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <select className="border p-2" value={form.pet_id} onChange={e=>setForm({...form, pet_id:e.target.value})}>
          {pets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input className="border p-2" placeholder="Vet name" value={form.vet_name} onChange={e=>setForm({...form, vet_name:e.target.value})} required />
        <input className="border p-2" type="datetime-local" value={form.datetime} onChange={e=>setForm({...form, datetime:e.target.value})} required />
        <div className="flex flex-wrap gap-2">
          {services.map(s => (
            <label key={s.id} className="inline-flex items-center gap-1 text-sm">
              <input type="checkbox" checked={form.service_ids.includes(s.id)} onChange={()=>toggleService(s.id)} />
              <span>{s.name} ({s.price} AED)</span>
            </label>
          ))}
        </div>
      </div>
      <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{loading ? 'Scheduling...' : 'Schedule'}</button>
    </form>
  )
}

