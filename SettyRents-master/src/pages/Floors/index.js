import {useState} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const Floors = () => {
  // Temporary buildings (later from API)
  const [buildings] = useState([
    {id: 1, name: 'Sai Residency'},
    {id: 2, name: 'Lakshmi Towers'},
  ])

  const [buildingId, setBuildingId] = useState('')
  const [floorName, setFloorName] = useState('')
  const [floors, setFloors] = useState([])

  const handleSubmit = e => {
    e.preventDefault()
    const selectedBuilding = buildings.find(b => b.id === parseInt(buildingId))

    const newFloor = {
      id: Date.now(),
      buildingName: selectedBuilding?.name,
      floorName,
    }

    setFloors([...floors, newFloor])
    setFloorName('')
    setBuildingId('')
  }

  return (
    <Layout>
      <div className='floor-container'>
        <h2>Add Floor</h2>
        <form className='floor-form' onSubmit={handleSubmit}>
          <select
            value={buildingId}
            onChange={e => setBuildingId(e.target.value)}
            required
          >
            <option value=''>Select Building</option>
            {buildings.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type='text'
            placeholder='Floor Name (Ex: Ground, Floor 1)'
            value={floorName}
            onChange={e => setFloorName(e.target.value)}
            required
          />

          <button type='submit'>Add Floor</button>
        </form>

        <h2>Floors List</h2>

        {/* Desktop Table */}
        <div className='table-container desktop-table'>
          <table>
            <thead>
              <tr>
                <th>Building</th>
                <th>Floor</th>
              </tr>
            </thead>
            <tbody>
              {floors.map(item => (
                <tr key={item.id}>
                  <td>{item.buildingName}</td>
                  <td>{item.floorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className='mobile-list'>
          {floors.map(item => (
            <div key={item.id} className='mobile-row'>
              <div className='mobile-field'>
                <span className='label'>Building:</span>
                <span className='value'>{item.buildingName}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Floor:</span>
                <span className='value'>{item.floorName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Floors
