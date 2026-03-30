import {useState} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const Bills = () => {
  const [records, setRecords] = useState([])

  // Form states
  const [tenantName, setTenantName] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [floor, setFloor] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [previous, setPrevious] = useState('')
  const [current, setCurrent] = useState('')
  const [units, setUnits] = useState('') // Manual units
  const [rate, setRate] = useState('') // Manual rate
  const [amount, setAmount] = useState(0)
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  // Filter states
  const [filterTenant, setFilterTenant] = useState('')
  const [filterRoom, setFilterRoom] = useState('')
  const [filterBuilding, setFilterBuilding] = useState('')
  const [filterMonth, setFilterMonth] = useState('')
  const [filterYear, setFilterYear] = useState('')

  // Calculate Units and Amount whenever Current or Previous changes
  const handleUnitCalculation = () => {
    if (previous !== '' && current !== '') {
      const calculatedUnits = Number(current) - Number(previous)
      setUnits(calculatedUnits >= 0 ? calculatedUnits : 0)
      if (rate !== '') setAmount(calculatedUnits * Number(rate))
    }
  }

  const handleRateChange = e => {
    setRate(e.target.value)
    if (units !== '') setAmount(Number(e.target.value) * Number(units))
  }

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

    // Reset form
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

  const handlePrint = record => {
    const printWindow = window.open('', '', 'height=700,width=800')
    printWindow.document.write(`
      <html>
        <head>
          <title>Electricity Bill</title>
          <style>
            body{font-family:Arial,sans-serif;padding:20px}
            .bill-header{text-align:center;margin-bottom:20px}
            .bill-header h1{margin:0;color:#f59e0b}
            .bill-info,.bill-table{width:100%;margin-bottom:20px}
            .bill-info td{padding:6px 10px}
            .bill-table th,.bill-table td{border:1px solid #000;padding:8px;text-align:left}
            .bill-table{border-collapse:collapse;width:100%}
            .total{text-align:right;font-weight:bold;margin-top:10px}
          </style>
        </head>
        <body>
          <div class="bill-header">
            <h1>Electricity Bill</h1>
            <p>${record.buildingName}</p>
          </div>
          <table class="bill-info">
            <tr>
              <td><strong>Tenant:</strong> ${record.tenantName}</td>
              <td><strong>Room:</strong> ${record.room}</td>
            </tr>
            <tr>
              <td><strong>Floor:</strong> ${record.floor}</td>
              <td><strong>Month/Year:</strong> ${record.month} ${record.year}</td>
            </tr>
          </table>
          <table class="bill-table">
            <thead>
              <tr>
                <th>Previous Reading</th>
                <th>Current Reading</th>
                <th>Units</th>
                <th>Rate (₹)</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${record.previous}</td>
                <td>${record.current}</td>
                <td>${record.units}</td>
                <td>${record.rate}</td>
                <td>${record.amount}</td>
              </tr>
            </tbody>
          </table>
          <p class="total">Total Amount: ₹${record.amount}</p>
          <p>Thank you for your payment!</p>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const filteredRecords = records.filter(
    r =>
      (filterTenant
        ? r.tenantName.toLowerCase() === filterTenant.toLowerCase()
        : true) &&
      (filterRoom ? r.room.toLowerCase() === filterRoom.toLowerCase() : true) &&
      (filterBuilding
        ? r.buildingName.toLowerCase() === filterBuilding.toLowerCase()
        : true) &&
      (filterMonth ? r.month === filterMonth : true) &&
      (filterYear ? r.year.toString() === filterYear.toString() : true),
  )

  const handlePrintAll = () => {
    const printWindow = window.open('', '', 'height=700,width=800')
    printWindow.document.write(
      '<html><head><title>Filtered Bills</title></head><body>',
    )
    filteredRecords.forEach(record => {
      printWindow.document.write(`
        <div style="page-break-after:always">
          <h1 style="text-align:center;color:#f59e0b">Electricity Bill</h1>
          <p style="text-align:center">${record.buildingName}</p>
          <table style="width:100%;margin-bottom:20px">
            <tr>
              <td><strong>Tenant:</strong> ${record.tenantName}</td>
              <td><strong>Room:</strong> ${record.room}</td>
            </tr>
            <tr>
              <td><strong>Floor:</strong> ${record.floor}</td>
              <td><strong>Month/Year:</strong> ${record.month} ${record.year}</td>
            </tr>
          </table>
          <table style="width:100%;border-collapse:collapse;border:1px solid #000;margin-bottom:20px">
            <thead>
              <tr>
                <th>Previous</th>
                <th>Current</th>
                <th>Units</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${record.previous}</td>
                <td>${record.current}</td>
                <td>${record.units}</td>
                <td>${record.rate}</td>
                <td>${record.amount}</td>
              </tr>
            </tbody>
          </table>
          <p style="text-align:right;font-weight:bold">Total Amount: ₹${record.amount}</p>
        </div>
      `)
    })
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <Layout>
      <div className='bill-container'>
        <h2>Electricity Bills</h2>

        {/* Bill Form */}
        <form className='bill-form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Tenant Name'
            value={tenantName}
            onChange={e => setTenantName(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Room Number'
            value={roomNumber}
            onChange={e => setRoomNumber(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Floor'
            value={floor}
            onChange={e => setFloor(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Building Name'
            value={buildingName}
            onChange={e => setBuildingName(e.target.value)}
            required
          />

          <input
            type='number'
            placeholder='Previous Reading'
            value={previous}
            onChange={e => setPrevious(e.target.value)}
            onBlur={handleUnitCalculation}
            required
          />
          <input
            type='number'
            placeholder='Current Reading'
            value={current}
            onChange={e => setCurrent(e.target.value)}
            onBlur={handleUnitCalculation}
            required
          />
          <input
            type='number'
            placeholder='Units'
            value={units}
            onChange={e => setUnits(e.target.value)}
            required
          />
          <input
            type='number'
            placeholder='Rate per unit'
            value={rate}
            onChange={handleRateChange}
            required
          />
          <input type='number' placeholder='Amount' value={amount} readOnly />

          <select
            value={month}
            onChange={e => setMonth(e.target.value)}
            required
          >
            <option value=''>Select Month</option>
            {[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ].map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <input
            type='number'
            placeholder='Year'
            value={year}
            onChange={e => setYear(e.target.value)}
            required
          />

          <div className='calculation'>
            <p>Units: {units}</p>
            <p>Amount: ₹{amount}</p>
          </div>

          <button type='submit'>Save Bill</button>
        </form>

        {/* Filters */}
        <h2>Filter Bills</h2>
        <div className='filter-container'>
          <input
            placeholder='Tenant Name'
            value={filterTenant}
            onChange={e => setFilterTenant(e.target.value)}
          />
          <input
            placeholder='Room Number'
            value={filterRoom}
            onChange={e => setFilterRoom(e.target.value)}
          />
          <input
            placeholder='Building Name'
            value={filterBuilding}
            onChange={e => setFilterBuilding(e.target.value)}
          />
          <select
            value={filterMonth}
            onChange={e => setFilterMonth(e.target.value)}
          >
            <option value=''>All Months</option>
            {[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ].map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            type='number'
            placeholder='Year'
            value={filterYear}
            onChange={e => setFilterYear(e.target.value)}
          />
          <button type='button' onClick={handlePrintAll}>
            Print Filtered Bills
          </button>
        </div>

        {/* Bill Records Table */}
        <h2>Bill Records</h2>
        <div className='table-container'>
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
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handlePrint(item)}>Print</button>
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

export default Bills
