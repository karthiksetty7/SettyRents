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
  const [lastValues, setLastValues] = useState({})

  // Auto-fill last month's values if tenant exists
  useEffect(() => {
    if (!tenantId) return
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
      setPaid('')
      setStatus('not vacated')
      setAdvance('')
    } else {
      setRent('')
      setWater(300)
      setMaintenance('')
      setElectricity('')
      setPreviousDue(0)
      setPaid('')
      setStatus('not vacated')
      setAdvance('')
    }
  }, [tenantId, entries])

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
    if (!tenantId || !month) {
      alert('Please select tenant and month')
      return
    }

    const tId = parseInt(tenantId)
    const tenant = tenants.find(t => t.id === tId)
    const isFirstMonth = !entries.find(entry => entry.tenantId === tId)

    if (isFirstMonth && (!rent || !water || !maintenance || !electricity)) {
      alert(
        'First month for new tenant requires specifying Rent, Water, Maintenance, Electricity',
      )
      return
    }

    const waterValue = water ? Number(water) : lastValues[tId]?.water || 300

    const newEntry = {
      id: Date.now(),
      tenantId: tId,
      tenant: tenant?.name,
      room: tenant?.room,
      month,
      rent: Number(rent || 0),
      water: waterValue,
      maintenance: Number(maintenance || 0),
      electricity: Number(electricity || 0),
      previousDue: isFirstMonth ? 0 : Number(previousDue || 0),
      total,
      paid: Number(paid || 0),
      advance: Number(advance || 0),
      status,
      due,
    }

    const existingIndex = entries.findIndex(
      e => e.tenantId === tId && e.month === month,
    )
    let updatedEntries = [...entries]
    if (existingIndex !== -1) updatedEntries[existingIndex] = newEntry
    else updatedEntries.push(newEntry)

    setEntries(updatedEntries)

    setLastValues(prev => ({
      ...prev,
      [tId]: {
        rent: newEntry.rent,
        water: newEntry.water,
        maintenance: newEntry.maintenance,
        electricity: newEntry.electricity,
        previousDue: newEntry.due,
      },
    }))

    // Reset fields
    setMonth('')
    setRent('')
    setWater(newEntry.water)
    setMaintenance('')
    setElectricity('')
    setPreviousDue(newEntry.due)
    setPaid('')
    setStatus('not vacated')
    setAdvance('')
  }

  const handleEdit = entry => {
    setTenantId(entry.tenantId.toString())
    setMonth(entry.month)
    setRent(entry.rent)
    setWater(entry.water)
    setMaintenance(entry.maintenance)
    setElectricity(entry.electricity)
    setPreviousDue(entry.previousDue)
    setPaid(entry.paid)
    setStatus(entry.status)
    setAdvance(entry.advance)
  }

  return (
    <Layout>
      <div className='rent-container'>
        <h2>Rent Entry</h2>
        <form className='rent-form' onSubmit={handleSubmit}>
          <select
            value={tenantId}
            onChange={e => setTenantId(e.target.value)}
            required
          >
            <option value=''>Select Tenant</option>
            {tenants.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} - Room {item.room}
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
            placeholder='Water Bill'
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
            placeholder='Electricity Bill'
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
            placeholder='Amount Paid'
            value={paid}
            onChange={e => setPaid(e.target.value)}
          />

          <input
            type='number'
            placeholder='Advance (if vacating)'
            value={advance}
            onChange={e => setAdvance(e.target.value)}
          />

          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value='not vacated'>Not Vacated</option>
            <option value='vacating'>Vacating</option>
          </select>

          <div className='calculation'>
            <p>Total: {total}</p>
            <p
              className={
                status === 'vacating'
                  ? due >= 0
                    ? 'due-overdue'
                    : 'due-refund'
                  : due > 0
                  ? 'due-overdue'
                  : 'due-refund'
              }
            >
              Due:{' '}
              {status === 'vacating'
                ? due >= 0
                  ? due + ' (Tenant owes owner)'
                  : -due + ' (Owner owes tenant)'
                : due}
            </p>
          </div>

          <button type='submit'>Save Entry</button>
        </form>

        <h2>Rent Records (Click row to edit)</h2>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Room</th>
                <th>Month</th>
                <th>Rent</th>
                <th>Water</th>
                <th>Maintenance</th>
                <th>Electricity</th>
                <th>Previous Due</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Advance</th>
                <th>Status</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(item => (
                <tr
                  key={item.id}
                  style={{cursor: 'pointer'}}
                  onClick={() => handleEdit(item)}
                >
                  <td data-label='Tenant'>{item.tenant}</td>
                  <td data-label='Room'>{item.room}</td>
                  <td data-label='Month'>{item.month}</td>
                  <td data-label='Rent'>{item.rent}</td>
                  <td data-label='Water'>{item.water}</td>
                  <td data-label='Maintenance'>{item.maintenance}</td>
                  <td data-label='Electricity'>{item.electricity}</td>
                  <td data-label='Previous Due'>{item.previousDue}</td>
                  <td data-label='Total'>{item.total}</td>
                  <td data-label='Paid'>{item.paid}</td>
                  <td data-label='Advance'>{item.advance}</td>
                  <td data-label='Status'>{item.status}</td>
                  <td
                    data-label='Due'
                    className={
                      item.status === 'vacating'
                        ? item.due >= 0
                          ? 'due-overdue'
                          : 'due-refund'
                        : item.due > 0
                        ? 'due-overdue'
                        : 'due-refund'
                    }
                  >
                    {item.status === 'vacating'
                      ? item.due >= 0
                        ? item.due + ' (Tenant owes owner)'
                        : -item.due + ' (Owner owes tenant)'
                      : item.due}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default RentEntry
