import {useState} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const Rooms = () => {
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

const [buildingId, setBuildingId] = useState('')
const [floorId, setFloorId] = useState('')
const [roomNumber, setRoomNumber] = useState('')
const [rooms, setRooms] = useState([])

const filteredFloors = floors.filter(
floor => floor.buildingId === parseInt(buildingId),
)

const handleSubmit = e => {
e.preventDefault()

const building = buildings.find(b => b.id === parseInt(buildingId))
const floor = floors.find(f => f.id === parseInt(floorId))

const newRoom = {
  id: Date.now(),
  buildingName: building?.name,
  floorName: floor?.name,
  roomNumber,
}

setRooms([...rooms, newRoom])
setRoomNumber('')
setBuildingId('')
setFloorId('')


}

return ( <Layout> <div className="room-container"> <h2>Add Room</h2>


    <form className="room-form" onSubmit={handleSubmit}>
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

      <input
        type="text"
        placeholder="Room Number"
        value={roomNumber}
        onChange={e => setRoomNumber(e.target.value)}
        required
      />

      <button type="submit">Add Room</button>
    </form>

    <h2>Rooms List</h2>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Building</th>
            <th>Floor</th>
            <th>Room</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map(item => (
            <tr key={item.id}>
              <td>{item.buildingName}</td>
              <td>{item.floorName}</td>
              <td>{item.roomNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</Layout>


)
}

export default Rooms
