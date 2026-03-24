import {useState} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const Bills = () => {
const [rooms] = useState([
{id: 1, number: '101'},
{id: 2, number: '201'},
])

const [roomId, setRoomId] = useState('')
const [previous, setPrevious] = useState('')
const [current, setCurrent] = useState('')
const [rate, setRate] = useState(10)

const [records, setRecords] = useState([])

const units = Number(current) - Number(previous)
const amount = units * Number(rate)

const handleSubmit = e => {
e.preventDefault()


const room = rooms.find(r => r.id === parseInt(roomId))

const newRecord = {
  id: Date.now(),
  room: room?.number,
  previous,
  current,
  units,
  rate,
  amount,
}

setRecords([...records, newRecord])

setRoomId('')
setPrevious('')
setCurrent('')


}

return ( <Layout> <div className="bill-container"> <h2>Electricity Bills</h2>


    <form className="bill-form" onSubmit={handleSubmit}>
      <select
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
        required
      >
        <option value="">Select Room</option>
        {rooms.map(item => (
          <option key={item.id} value={item.id}>
            Room {item.number}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Previous Reading"
        value={previous}
        onChange={e => setPrevious(e.target.value)}
      />

      <input
        type="number"
        placeholder="Current Reading"
        value={current}
        onChange={e => setCurrent(e.target.value)}
      />

      <input
        type="number"
        placeholder="Rate per unit"
        value={rate}
        onChange={e => setRate(e.target.value)}
      />

      <div className="calculation">
        <p>Units: {units}</p>
        <p>Amount: ₹{amount}</p>
      </div>

      <button type="submit">Save Bill</button>
    </form>

    <h2>Bill Records</h2>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Previous</th>
            <th>Current</th>
            <th>Units</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {records.map(item => (
            <tr key={item.id}>
              <td>{item.room}</td>
              <td>{item.previous}</td>
              <td>{item.current}</td>
              <td>{item.units}</td>
              <td>{item.rate}</td>
              <td>{item.amount}</td>
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
