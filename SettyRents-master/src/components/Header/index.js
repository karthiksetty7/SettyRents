import {FaBars} from 'react-icons/fa'
import './index.css'

const Header = ({toggleSidebar}) => {
return ( <div className="header"> <div className="header-left"> <button
       className="menu-btn"
       onClick={toggleSidebar}
     > <FaBars /> </button>


    <h1>Rental Management System</h1>
  </div>

  <button className="logout-btn">
    Logout
  </button>
</div>


)
}

export default Header
