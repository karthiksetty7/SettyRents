import {useState} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const Buildings = () => {
  const [buildingName, setBuildingName] = useState('')
  const [address, setAddress] = useState('')
  const [buildings, setBuildings] = useState([])
  const [editId, setEditId] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    if (!buildingName || !address) {
      alert('Please provide building name and address')
      return
    }

    if (editId) {
      // Update existing building
      setBuildings(
        buildings.map(b =>
          b.id === editId ? {...b, buildingName, address} : b,
        ),
      )
      setEditId(null)
    } else {
      // Add new building
      const newBuilding = {
        id: Date.now(),
        buildingName,
        address,
      }
      setBuildings([...buildings, newBuilding])
    }

    setBuildingName('')
    setAddress('')
  }

  const handleEdit = building => {
    setBuildingName(building.buildingName)
    setAddress(building.address)
    setEditId(building.id)
  }

  return (
    <Layout>
      <div className='building-container'>
        <h2>Add / Edit Building</h2>
        <form className='building-form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Building Name'
            value={buildingName}
            onChange={e => setBuildingName(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Address'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
          <button type='submit'>
            {editId ? 'Update Building' : 'Save Building'}
          </button>
        </form>

        <h2>Buildings List (Click to edit)</h2>

        {/* Desktop Table */}
        <div className='table-container desktop-table'>
          <table>
            <thead>
              <tr>
                <th>Building Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {buildings.map(item => (
                <tr
                  key={item.id}
                  onClick={() => handleEdit(item)}
                  className={editId === item.id ? 'editing' : ''}
                >
                  <td>{item.buildingName}</td>
                  <td>{item.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className='mobile-list'>
          {buildings.map(item => (
            <div
              key={item.id}
              className={`mobile-row ${editId === item.id ? 'editing' : ''}`}
              onClick={() => handleEdit(item)}
            >
              <div className='mobile-field'>
                <span className='label'>Building Name:</span>
                <span className='value'>{item.buildingName}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Address:</span>
                <span className='value'>{item.address}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Buildings
