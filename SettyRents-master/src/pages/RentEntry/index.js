import {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const RentEntry = () => {
  const [tenants] = useState([
    {id: 1, name: 'Ravi', room: '101'},
    {id: 2, name: 'Suresh', room: '201'},
  ])

  const [tenantId, setTenantId] = useState('')
  const [month, setMonth] = useState('')
  const [rent, setRent] = useState('')
  const [water, setWater] = useState('')
  const [maintenance, setMaintenance] = useState('')
  const [electricity, setElectricity] = useState('')
  const [previousDue, setPreviousDue] = useState(0)
  const [paid, setPaid] = useState('')
  const [advance, setAdvance] = useState('')
  const [status, setStatus] = useState('not vacated')

  const [entries, setEntries] = useState([])
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    if (!tenantId || editingId) return // FIX: stop autofill when editing

    const tId = parseInt(tenantId)

    const tenantEntries = entries
      .filter(e => e.tenantId === tId)
      .sort((a, b) => (a.month > b.month ? 1 : -1))

    if (tenantEntries.length) {
      const lastEntry = tenantEntries[tenantEntries.length - 1]
      setRent(lastEntry.rent)
      setWater(lastEntry.water)
      setMaintenance(lastEntry.maintenance)
      setElectricity(lastEntry.electricity)
      setPreviousDue(lastEntry.due)
    } else {
      setRent('')
      setWater(300)
      setMaintenance('')
      setElectricity('')
      setPreviousDue(0)
    }
  }, [tenantId, entries, editingId])

  const calculateTotal = () =>
    Number(rent || 0) +
    Number(water || 300) +
    Number(maintenance || 0) +
    Number(electricity || 0) +
    Number(previousDue || 0)

  const calculateDue = () => {
    const total = calculateTotal()
    const p = Number(paid || 0)
    const adv = Number(advance || 0)
    if (status === 'vacating') return total - p - adv
    return total - p
  }

  const total = calculateTotal()
  const due = calculateDue()

  const handleSubmit = e => {
    e.preventDefault()

    const tenant = tenants.find(t => t.id === parseInt(tenantId))

    const newEntry = {
      id: editingId || Date.now(),
      tenantId: parseInt(tenantId),
      tenant: tenant?.name,
      room: tenant?.room,
      month,
      rent: Number(rent || 0),
      water: Number(water || 300),
      maintenance: Number(maintenance || 0),
      electricity: Number(electricity || 0),
      previousDue,
      total,
      paid: Number(paid || 0),
      advance: Number(advance || 0),
      status,
      due,
    }

    if (editingId) {
      setEntries(prev => prev.map(e => (e.id === editingId ? newEntry : e)))
      setEditingId(null)
    } else {
      setEntries(prev => [...prev, newEntry])
    }

    handleCancel()
  }

  const handleEdit = entry => {
    setEditingId(entry.id)
    setTenantId(entry.tenantId.toString())
    setMonth(entry.month)
    setRent(entry.rent)
    setWater(entry.water)
    setMaintenance(entry.maintenance)
    setElectricity(entry.electricity)
    setPreviousDue(entry.previousDue)
    setPaid(entry.paid)
    setAdvance(entry.advance)
    setStatus(entry.status)
  }

  const handleDelete = id => {
    if (window.confirm('Delete this entry?')) {
      setEntries(prev => prev.filter(e => e.id !== id))
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setTenantId('')
    setMonth('')
    setRent('')
    setWater('')
    setMaintenance('')
    setElectricity('')
    setPreviousDue(0)
    setPaid('')
    setAdvance('')
    setStatus('not vacated')
  }

  return (
    <Layout>
      <div className='rent-container'>
        <h2>{editingId ? 'Update Rent Entry' : 'Rent Entry'}</h2>

        <form className='rent-form' onSubmit={handleSubmit}>
          <select
            value={tenantId}
            onChange={e => setTenantId(e.target.value)}
            required
          >
            <option value=''>Select Tenant</option>
            {tenants.map(t => (
              <option key={t.id} value={t.id}>
                {t.name} - Room {t.room}
              </option>
            ))}
          </select>

          <input
            type='month'
            value={month}
            onChange={e => setMonth(e.target.value)}
            required
          />

          <input
            type='number'
            placeholder='Rent'
            value={rent}
            onChange={e => setRent(e.target.value)}
          />
          <input
            type='number'
            placeholder='Water'
            value={water}
            onChange={e => setWater(e.target.value)}
          />
          <input
            type='number'
            placeholder='Maintenance'
            value={maintenance}
            onChange={e => setMaintenance(e.target.value)}
          />
          <input
            type='number'
            placeholder='Electricity'
            value={electricity}
            onChange={e => setElectricity(e.target.value)}
          />

          <input
            type='number'
            placeholder='Previous Due'
            value={previousDue}
            readOnly
          />

          <input
            type='number'
            placeholder='Paid'
            value={paid}
            onChange={e => setPaid(e.target.value)}
          />
          <input
            type='number'
            placeholder='Advance'
            value={advance}
            onChange={e => setAdvance(e.target.value)}
          />

          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value='not vacated'>Not Vacated</option>
            <option value='vacating'>Vacating</option>
          </select>

          <div className='calculation'>
            <p>Total: {total}</p>
            <p className={due > 0 ? 'due-overdue' : 'due-refund'}>Due: {due}</p>
          </div>

          <button type='submit'>
            {editingId ? 'Update Entry' : 'Save Entry'}
          </button>

          {editingId && (
            <button type='button' className='cancel-btn' onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>

        <h2>Rent Records</h2>

        <div className='table-container desktop-table'>
          <table>
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Room</th>
                <th>Month</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(e => (
                <tr key={e.id}>
                  <td>{e.tenant}</td>
                  <td>{e.room}</td>
                  <td>{e.month}</td>
                  <td>{e.total}</td>
                  <td>{e.paid}</td>
                  <td className={e.due > 0 ? 'due-overdue' : 'due-refund'}>
                    {e.due}
                  </td>
                  <td>
                    <button className='edit-btn' onClick={() => handleEdit(e)}>
                      Edit
                    </button>
                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mobile-list'>
          {entries.map(e => (
            <div key={e.id} className='mobile-row'>
              <div className='mobile-field'>
                <span className='label'>Tenant:</span>
                <span className='value'>{e.tenant}</span>
              </div>

              <div className='mobile-field'>
                <span className='label'>Room:</span>
                <span className='value'>{e.room}</span>
              </div>

              <div className='mobile-field'>
                <span className='label'>Month:</span>
                <span className='value'>{e.month}</span>
              </div>

              <div className='mobile-field'>
                <span className='label'>Total:</span>
                <span className='value'>{e.total}</span>
              </div>

              <div className='mobile-field'>
                <span className='label'>Paid:</span>
                <span className='value'>{e.paid}</span>
              </div>

              <div className='mobile-field'>
                <span className='label'>Due:</span>
                <span className='value'>{e.due}</span>
              </div>

              <div className='mobile-field'>
                <button className='edit-btn' onClick={() => handleEdit(e)}>
                  Edit
                </button>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default RentEntry
