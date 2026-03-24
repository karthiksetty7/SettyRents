import {useState} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const RentEntry = () => {
// temporary tenant data
const [tenants] = useState([
{id: 1, name: 'Ravi', room: '101'},
{id: 2, name: 'Suresh', room: '201'},
])

const [tenantId, setTenantId] = useState('')
const [rent, setRent] = useState('')
const [water, setWater] = useState('')
const [maintenance, setMaintenance] = useState('')
const [previousDue, setPreviousDue] = useState('')
const [paid, setPaid] = useState('')

const [entries, setEntries] = useState([])

const total =
Number(rent) +
Number(water) +
Number(maintenance) +
Number(previousDue)

const due = total - Number(paid)

const handleSubmit = e => {
e.preventDefault()


const tenant = tenants.find(t => t.id === parseInt(tenantId))

const newEntry = {
  id: Date.now(),
  tenant: tenant?.name,
  room: tenant?.room,
  rent,
  water,
  maintenance,
  previousDue,
  total,
  paid,
  due,
}

setEntries([...entries, newEntry])

setTenantId('')
setRent('')
setWater('')
setMaintenance('')
setPreviousDue('')
setPaid('')


}

return ( <Layout> <div className="rent-container"> <h2>Rent Entry</h2>


    <form className="rent-form" onSubmit={handleSubmit}>
      <select
        value={tenantId}
        onChange={e => setTenantId(e.target.value)}
        required
      >
        <option value="">Select Tenant</option>
        {tenants.map(item => (
          <option key={item.id} value={item.id}>
            {item.name} - Room {item.room}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Rent"
        value={rent}
        onChange={e => setRent(e.target.value)}
      />

      <input
        type="number"
        placeholder="Water Bill"
        value={water}
        onChange={e => setWater(e.target.value)}
      />

      <input
        type="number"
        placeholder="Maintenance"
        value={maintenance}
        onChange={e => setMaintenance(e.target.value)}
      />

      <input
        type="number"
        placeholder="Previous Due"
        value={previousDue}
        onChange={e => setPreviousDue(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount Paid"
        value={paid}
        onChange={e => setPaid(e.target.value)}
      />

      <div className="calculation">
        <p>Total: {total}</p>
        <p>Due: {due}</p>
      </div>

      <button type="submit">Save Entry</button>
    </form>

    <h2>Rent Records</h2>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Tenant</th>
            <th>Room</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Due</th>
          </tr>
        </thead>

        <tbody>
          {entries.map(item => (
            <tr key={item.id}>
              <td>{item.tenant}</td>
              <td>{item.room}</td>
              <td>{item.total}</td>
              <td>{item.paid}</td>
              <td>{item.due}</td>
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
