import {NavLink} from 'react-router-dom'
import './index.css'

const Sidebar = ({isOpen}) => {
return (
<div className={`sidebar ${isOpen ? 'open' : ''}`}> <div className="logo-container"> <img
       src="/logo.png"
       alt="logo"
       className="logo-img"
     /> <h2>Rent Manager</h2> </div>


  <nav>
    <NavLink to="/">Dashboard</NavLink>
    <NavLink to="/buildings">Buildings</NavLink>
    <NavLink to="/floors">Floors</NavLink>
    <NavLink to="/rooms">Rooms</NavLink>
    <NavLink to="/tenants">Tenants</NavLink>
    <NavLink to="/rent">Rent Entry</NavLink>
    <NavLink to="/bills">Bills</NavLink>
    <NavLink to="/reports">Reports</NavLink>
  </nav>
</div>


)
}

export default Sidebar
