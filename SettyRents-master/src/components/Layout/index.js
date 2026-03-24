import {useState} from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import './index.css'

const Layout = ({children}) => {
const [isOpen, setIsOpen] = useState(false)

const toggleSidebar = () => {
setIsOpen(!isOpen)
}

return ( <div className="layout"> <Sidebar isOpen={isOpen} />


  <div className="main-container">
    <Header toggleSidebar={toggleSidebar} />

    <div className="content">
      {children}
    </div>
  </div>
</div>


)
}

export default Layout
