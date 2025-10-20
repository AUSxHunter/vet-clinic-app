'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiPost } from '../lib/api'

export default function OwnerForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const created = await apiPost('/api/owners', form)
      if (created?.id) {
        localStorage.setItem('ownerId', created.id)
        localStorage.setItem('ownerName', created.name)
      }
      setForm({ name: '', phone: '', email: '' })
      router.refresh()
    } catch (err) {
      setError(err.message || 'Error creating owner')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">Add Owner</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="border p-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="border p-2" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
        <input className="border p-2" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
      </div>
      <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
    </form>
  )
}

