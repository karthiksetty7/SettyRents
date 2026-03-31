import {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const Bills = () => {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('billRecords')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('billRecords', JSON.stringify(records))
  }, [records])

  // Form states
  const [tenantName, setTenantName] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [floor, setFloor] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [previous, setPrevious] = useState('')
  const [current, setCurrent] = useState('')
  const [units, setUnits] = useState('')
  const [rate, setRate] = useState('')
  const [amount, setAmount] = useState(0)
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  // Filter states
  const [filterTenant, setFilterTenant] = useState('')
  const [filterRoom, setFilterRoom] = useState('')
  const [filterBuilding, setFilterBuilding] = useState('')
  const [filterMonth, setFilterMonth] = useState('')
  const [filterYear, setFilterYear] = useState('')

  // AUTO CALCULATION
  useEffect(() => {
    if (previous !== '' && current !== '') {
      const calculatedUnits = Number(current) - Number(previous)
      const finalUnits = calculatedUnits >= 0 ? calculatedUnits : 0
      setUnits(finalUnits)

      if (rate !== '') {
        setAmount(finalUnits * Number(rate))
      } else {
        setAmount(0)
      }
    }
  }, [previous, current, rate])

  const handleSubmit = e => {
    e.preventDefault()

    const newRecord = {
      id: Date.now(),
      tenantName,
      room: roomNumber,
      floor,
      buildingName,
      previous,
      current,
      units,
      rate,
      amount,
      month,
      year,
    }

    setRecords([...records, newRecord])

    setTenantName('')
    setRoomNumber('')
    setFloor('')
    setBuildingName('')
    setPrevious('')
    setCurrent('')
    setUnits('')
    setRate('')
    setAmount(0)
    setMonth('')
    setYear('')
  }

  const handleEdit = id => {
    const record = records.find(r => r.id === id)
    if (!record) return

    setTenantName(record.tenantName)
    setRoomNumber(record.room)
    setFloor(record.floor)
    setBuildingName(record.buildingName)
    setPrevious(record.previous)
    setCurrent(record.current)
    setUnits(record.units)
    setRate(record.rate)
    setAmount(record.amount)
    setMonth(record.month)
    setYear(record.year)

    setRecords(records.filter(r => r.id !== id))
  }

  const handleDelete = id => {
    if (!window.confirm('Delete this bill?')) return
    setRecords(records.filter(r => r.id !== id))
  }

  const handlePrint = record => {
    const printWindow = window.open('', '', 'height=700,width=800')
    printWindow.document.write(`
      <h2>Electricity Bill</h2>
      <p>Name: ${record.tenantName}</p>
      <p>Room: ${record.room}</p>
      <p>Units: ${record.units}</p>
      <p>Amount: ₹${record.amount}</p>
      <hr/>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const filteredRecords = records.filter(
    r =>
      (filterTenant
        ? r.tenantName.toLowerCase().includes(filterTenant.toLowerCase())
        : true) &&
      (filterRoom
        ? r.room.toLowerCase().includes(filterRoom.toLowerCase())
        : true) &&
      (filterBuilding
        ? r.buildingName.toLowerCase().includes(filterBuilding.toLowerCase())
        : true) &&
      (filterMonth ? r.month === filterMonth : true) &&
      (filterYear ? r.year.toString() === filterYear.toString() : true),
  )

  const handlePrintAll = () => {
    const printWindow = window.open('', '', 'height=700,width=800')

    filteredRecords.forEach(record => {
      printWindow.document.write(`
        <h2>Electricity Bill</h2>
        <p>Name: ${record.tenantName}</p>
        <p>Room: ${record.room}</p>
        <p>Units: ${record.units}</p>
        <p>Amount: ₹${record.amount}</p>
        <hr/>
      `)
    })

    printWindow.document.close()
    printWindow.print()
  }

  return (
    <Layout>
      <div className='bill-container'>
        <h2>Electricity Bills</h2>

        {/* FORM */}
        <form className='bill-form' onSubmit={handleSubmit}>
          <input
            placeholder='Tenant Name'
            value={tenantName}
            onChange={e => setTenantName(e.target.value)}
            required
          />
          <input
            placeholder='Room Number'
            value={roomNumber}
            onChange={e => setRoomNumber(e.target.value)}
            required
          />
          <input
            placeholder='Floor'
            value={floor}
            onChange={e => setFloor(e.target.value)}
            required
          />
          <input
            placeholder='Building Name'
            value={buildingName}
            onChange={e => setBuildingName(e.target.value)}
            required
          />

          <input
            type='number'
            placeholder='Previous'
            value={previous}
            onChange={e => setPrevious(e.target.value)}
            required
          />
          <input
            type='number'
            placeholder='Current'
            value={current}
            onChange={e => setCurrent(e.target.value)}
            required
          />
          <input type='number' placeholder='Units' value={units} readOnly />
          <input
            type='number'
            placeholder='Rate'
            value={rate}
            onChange={e => setRate(e.target.value)}
            required
          />
          <input type='number' placeholder='Amount' value={amount} readOnly />

          <input
            placeholder='Month'
            value={month}
            onChange={e => setMonth(e.target.value)}
            required
          />
          <input
            placeholder='Year'
            value={year}
            onChange={e => setYear(e.target.value)}
            required
          />

          <button type='submit'>Save Bill</button>
        </form>

        {/* FILTER */}
        <h3>Filter Bills</h3>
        <div className='filter-container'>
          <input
            placeholder='Tenant'
            value={filterTenant}
            onChange={e => setFilterTenant(e.target.value)}
          />
          <input
            placeholder='Room'
            value={filterRoom}
            onChange={e => setFilterRoom(e.target.value)}
          />
          <input
            placeholder='Building'
            value={filterBuilding}
            onChange={e => setFilterBuilding(e.target.value)}
          />
          <input
            placeholder='Month'
            value={filterMonth}
            onChange={e => setFilterMonth(e.target.value)}
          />
          <input
            placeholder='Year'
            value={filterYear}
            onChange={e => setFilterYear(e.target.value)}
          />
          <button onClick={handlePrintAll}>Print Filtered</button>
        </div>

        {/* DESKTOP TABLE */}
        <div className='table-container desktop-table'>
          <table>
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Room</th>
                <th>Floor</th>
                <th>Building</th>
                <th>Previous</th>
                <th>Current</th>
                <th>Units</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Month</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map(item => (
                <tr key={item.id}>
                  <td>{item.tenantName}</td>
                  <td>{item.room}</td>
                  <td>{item.floor}</td>
                  <td>{item.buildingName}</td>
                  <td>{item.previous}</td>
                  <td>{item.current}</td>
                  <td>{item.units}</td>
                  <td>{item.rate}</td>
                  <td>{item.amount}</td>
                  <td>{item.month}</td>
                  <td>{item.year}</td>
                  <td>
                    <button
                      className='edit-btn'
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className='print-btn'
                      onClick={() => handlePrint(item)}
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}
        <div className='mobile-list'>
          {filteredRecords.map(item => (
            <div key={item.id} className='mobile-row'>
              <div className='mobile-field'>
                <span className='label'>Tenant:</span>
                <span>{item.tenantName}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Room:</span>
                <span>{item.room}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Building:</span>
                <span>{item.buildingName}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Units:</span>
                <span>{item.units}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Amount:</span>
                <span>₹{item.amount}</span>
              </div>

              <div className='mobile-field'>
                <button
                  className='edit-btn'
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button className='print-btn' onClick={() => handlePrint(item)}>
                  Print
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Bills
