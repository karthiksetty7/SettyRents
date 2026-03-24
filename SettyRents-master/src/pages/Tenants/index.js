import {useState} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const Tenants = () => {
// temporary data (later from API)
const [buildings] = useState([
{id: 1, name: 'Sai Residency'},
{id: 2, name: 'Lakshmi Towers'},
])

const [floors] = useState([
{id: 1, buildingId: 1, name: 'Ground'},
{id: 2, buildingId: 1, name: 'Floor 1'},
{id: 3, buildingId: 2, name: 'Floor 1'},
])

const [rooms] = useState([
{id: 1, floorId: 1, buildingId: 1, number: '101'},
{id: 2, floorId: 2, buildingId: 1, number: '201'},
{id: 3, floorId: 3, buildingId: 2, number: '301'},
])

const [buildingId, setBuildingId] = useState('')
const [floorId, setFloorId] = useState('')
const [roomId, setRoomId] = useState('')

const [name, setName] = useState('')
const [phone, setPhone] = useState('')
const [advance, setAdvance] = useState('')

const [tenants, setTenants] = useState([])

const filteredFloors = floors.filter(
f => f.buildingId === parseInt(buildingId),
)

const filteredRooms = rooms.filter(
r =>
r.buildingId === parseInt(buildingId) &&
r.floorId === parseInt(floorId),
)

const handleSubmit = e => {
e.preventDefault()

const building = buildings.find(b => b.id === parseInt(buildingId))
const floor = floors.find(f => f.id === parseInt(floorId))
const room = rooms.find(r => r.id === parseInt(roomId))

const newTenant = {
  id: Date.now(),
  name,
  phone,
  advance,
  building: building?.name,
  floor: floor?.name,
  room: room?.number,
}

setTenants([...tenants, newTenant])

setName('')
setPhone('')
setAdvance('')
setBuildingId('')
setFloorId('')
setRoomId('')


}

return ( <Layout> <div className="tenant-container"> <h2>Add Tenant</h2>


    <form className="tenant-form" onSubmit={handleSubmit}>
      <select
        value={buildingId}
        onChange={e => setBuildingId(e.target.value)}
        required
      >
        <option value="">Select Building</option>
        {buildings.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={floorId}
        onChange={e => setFloorId(e.target.value)}
        required
      >
        <option value="">Select Floor</option>
        {filteredFloors.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
        required
      >
        <option value="">Select Room</option>
        {filteredRooms.map(item => (
          <option key={item.id} value={item.id}>
            {item.number}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Tenant Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Advance Amount"
        value={advance}
        onChange={e => setAdvance(e.target.value)}
        required
      />

      <button type="submit">Add Tenant</button>
    </form>

    <h2>Tenants List</h2>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Building</th>
            <th>Floor</th>
            <th>Room</th>
            <th>Advance</th>
          </tr>
        </thead>

        <tbody>
          {tenants.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.building}</td>
              <td>{item.floor}</td>
              <td>{item.room}</td>
              <td>{item.advance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</Layout>


)
}

export default Tenants
