'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InvoiceForm({ appointments }) {
  const router = useRouter()
  const [appointmentId, setAppointmentId] = useState(appointments[0]?.id || '')
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = `/api/invoices?appt_id=${appointmentId}&paid=${paid}`
      const res = await fetch((process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000') + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
      if (!res.ok) throw new Error(await res.text())
      setPaid(false)
      router.refresh()
    } catch (err) {
      setError(err.message || 'Error creating invoice')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">Generate Invoice</h2>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-3">
        <select className="border p-2" value={appointmentId} onChange={e=>setAppointmentId(e.target.value)}>
          {appointments.map(a => (
            <option key={a.id} value={a.id}>Appt #{a.id} - {a.vet_name} ({a.status})</option>
          ))}
        </select>
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={paid} onChange={e=>setPaid(e.target.checked)} /> Mark paid</label>
      </div>
      <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{loading ? 'Creating...' : 'Create'}</button>
    </form>
  )
}

