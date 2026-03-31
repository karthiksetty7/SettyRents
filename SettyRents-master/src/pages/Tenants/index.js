import {useState} from 'react'
import Layout from '../../components/Layout'
import './index.css'

const Tenants = () => {
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
  const [joiningDate, setJoiningDate] = useState('')
  const [file, setFile] = useState(null)

  const [tenants, setTenants] = useState([])
  const [editingId, setEditingId] = useState(null)

  const filteredFloors = floors.filter(
    f => f.buildingId === parseInt(buildingId),
  )
  const filteredRooms = rooms.filter(
    r =>
      r.buildingId === parseInt(buildingId) && r.floorId === parseInt(floorId),
  )

  const handleSubmit = e => {
    e.preventDefault()
    const building = buildings.find(b => b.id === parseInt(buildingId))
    const floor = floors.find(f => f.id === parseInt(floorId))
    const room = rooms.find(r => r.id === parseInt(roomId))

    if (editingId) {
      setTenants(prev =>
        prev.map(t =>
          t.id === editingId
            ? {
                ...t,
                name,
                phone,
                advance,
                joiningDate,
                building: building?.name,
                floor: floor?.name,
                room: room?.number,
                file: file ? URL.createObjectURL(file) : t.file,
                fileType: file?.type || t.fileType,
              }
            : t,
        ),
      )
      setEditingId(null)
    } else {
      setTenants(prev => [
        ...prev,
        {
          id: Date.now(),
          name,
          phone,
          advance,
          joiningDate,
          building: building?.name,
          floor: floor?.name,
          room: room?.number,
          file: file ? URL.createObjectURL(file) : null,
          fileType: file?.type,
        },
      ])
    }

    // Reset all form fields after add/update
    handleCancel()
  }

  const handleEdit = tenant => {
    setEditingId(tenant.id)
    setName(tenant.name)
    setPhone(tenant.phone)
    setAdvance(tenant.advance)
    setJoiningDate(tenant.joiningDate)

    const buildingObj = buildings.find(b => b.name === tenant.building)
    setBuildingId(buildingObj?.id || '')

    const floorObj = floors.find(
      f => f.name === tenant.floor && f.buildingId === buildingObj?.id,
    )
    setFloorId(floorObj?.id || '')

    const roomObj = rooms.find(
      r =>
        r.number === tenant.room &&
        r.buildingId === buildingObj?.id &&
        r.floorId === floorObj?.id,
    )
    setRoomId(roomObj?.id || '')
  }

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      setTenants(prev => prev.filter(t => t.id !== id))
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setName('')
    setPhone('')
    setAdvance('')
    setJoiningDate('')
    setBuildingId('')
    setFloorId('')
    setRoomId('')
    setFile(null)
  }

  const printTenant = tenant => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Tenant Details</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; }
            p { margin: 8px 0; }
            img { max-width: 100%; margin-top: 10px; }
            embed { width: 100%; height: 800px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h2>Tenant Details</h2>
          <p><b>Name:</b> ${tenant.name}</p>
          <p><b>Phone:</b> ${tenant.phone}</p>
          <p><b>Building:</b> ${tenant.building}</p>
          <p><b>Floor:</b> ${tenant.floor}</p>
          <p><b>Room:</b> ${tenant.room}</p>
          <p><b>Advance:</b> ${tenant.advance}</p>
          <p><b>Joining Date:</b> ${tenant.joiningDate}</p>
          ${
            tenant.file
              ? tenant.fileType?.includes('image')
                ? `<img src="${tenant.file}" />`
                : `<embed src="${tenant.file}" type="${tenant.fileType}" />`
              : ''
          }
          <script>window.onload = function(){ window.print(); window.close(); }</script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  const printAll = () => {
    const printWindow = window.open('', '_blank')
    const content = tenants
      .map(
        t => `
        <div style="margin-bottom:30px; page-break-inside: avoid;">
          <h3>${t.name}</h3>
          <p><b>Phone:</b> ${t.phone}</p>
          <p><b>Building:</b> ${t.building}</p>
          <p><b>Floor:</b> ${t.floor}</p>
          <p><b>Room:</b> ${t.room}</p>
          <p><b>Advance:</b> ${t.advance}</p>
          <p><b>Joining Date:</b> ${t.joiningDate}</p>
          ${
            t.file
              ? t.fileType?.includes('image')
                ? `<img src="${t.file}" style="max-width:100%; margin-top:10px;" />`
                : `<embed src="${t.file}" type="${t.fileType}" style="width:100%;height:800px; margin-top:10px;" />`
              : ''
          }
        </div>
      `,
      )
      .join('')

    printWindow.document.write(`
      <html>
        <head><title>All Tenants</title></head>
        <body>
          <h2 style="text-align:center;">All Tenants</h2>
          ${content}
          <script>window.onload = function(){ window.print(); window.close(); }</script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <Layout>
      <div className='tenant-container'>
        <h2>{editingId ? 'Edit Tenant' : 'Add Tenant'}</h2>

        <form className='tenant-form' onSubmit={handleSubmit}>
          <select
            value={buildingId}
            onChange={e => setBuildingId(e.target.value)}
            required
          >
            <option value=''>Select Building</option>
            {buildings.map(b => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            value={floorId}
            onChange={e => setFloorId(e.target.value)}
            required
          >
            <option value=''>Select Floor</option>
            {filteredFloors.map(f => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <select
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            required
          >
            <option value=''>Select Room</option>
            {filteredRooms.map(r => (
              <option key={r.id} value={r.id}>
                {r.number}
              </option>
            ))}
          </select>

          <input
            type='text'
            placeholder='Tenant Name'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Phone'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <input
            type='number'
            placeholder='Advance'
            value={advance}
            onChange={e => setAdvance(e.target.value)}
            required
          />
          <input
            type='date'
            value={joiningDate}
            onChange={e => setJoiningDate(e.target.value)}
            required
          />
          <input
            type='file'
            accept='image/*,.pdf'
            onChange={e => setFile(e.target.files[0])}
          />

          <button type='submit'>
            {editingId ? 'Update Tenant' : 'Add Tenant'}
          </button>
          {editingId && (
            <button type='button' className='cancel-btn' onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>

        <h2>Tenants List</h2>

        <div className='table-container desktop-table'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Building</th>
                <th>Floor</th>
                <th>Room</th>
                <th>Advance</th>
                <th>Joining</th>
                <th>Document</th>
                <th>Actions</th>
                <th>Print</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map(t => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.phone}</td>
                  <td>{t.building}</td>
                  <td>{t.floor}</td>
                  <td>{t.room}</td>
                  <td>{t.advance}</td>
                  <td>{t.joiningDate}</td>
                  <td>
                    {t.file && (
                      <a href={t.file} target='_blank' rel='noreferrer'>
                        View
                      </a>
                    )}
                  </td>
                  <td>
                    <button className='edit-btn' onClick={() => handleEdit(t)}>
                      Edit
                    </button>
                    <button
                      className='delete-btn'
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className='print-btn'
                      onClick={() => printTenant(t)}
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mobile-list'>
          {tenants.map(t => (
            <div key={t.id} className='mobile-row'>
              <div className='mobile-field'>
                <span className='label'>Name:</span>{' '}
                <span className='value'>{t.name}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Phone:</span>{' '}
                <span className='value'>{t.phone}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Building:</span>{' '}
                <span className='value'>{t.building}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Floor:</span>{' '}
                <span className='value'>{t.floor}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Room:</span>{' '}
                <span className='value'>{t.room}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Advance:</span>{' '}
                <span className='value'>{t.advance}</span>
              </div>
              <div className='mobile-field'>
                <span className='label'>Joining:</span>{' '}
                <span className='value'>{t.joiningDate}</span>
              </div>
              {t.file && (
                <div className='mobile-field'>
                  <span className='label'>Document:</span>{' '}
                  <span className='value'>
                    <a href={t.file} target='_blank' rel='noreferrer'>
                      View
                    </a>
                  </span>
                </div>
              )}
              <div className='mobile-field'>
                <button className='edit-btn' onClick={() => handleEdit(t)}>
                  Edit
                </button>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(t.id)}
                >
                  Delete
                </button>
                <button className='print-btn' onClick={() => printTenant(t)}>
                  Print
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign: 'right', marginTop: '10px'}}>
          <button className='print-btn' onClick={printAll}>
            Print All
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Tenants
