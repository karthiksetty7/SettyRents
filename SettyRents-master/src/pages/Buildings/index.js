import {useState} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const Buildings = () => {
const [buildingName, setBuildingName] = useState('')
const [address, setAddress] = useState('')
const [buildings, setBuildings] = useState([])

const handleSubmit = e => {
e.preventDefault()


const newBuilding = {
  id: Date.now(),
  buildingName,
  address,
}

setBuildings([...buildings, newBuilding])
setBuildingName('')
setAddress('')


}

return ( <Layout> <div className="building-container"> <h2>Add Building</h2>


    <form className="building-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Building Name"
        value={buildingName}
        onChange={e => setBuildingName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
      />

      <button type="submit">Add Building</button>
    </form>

    <h2>Buildings List</h2>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Building Name</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {buildings.map(item => (
            <tr key={item.id}>
              <td>{item.buildingName}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</Layout>


)
}

export default Buildings
