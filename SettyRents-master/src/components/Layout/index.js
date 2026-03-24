import {useState} from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import './index.css'

const Layout = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsOpen(!isOpen)

  // Close sidebar (used when clicking a menu item or overlay)
  const closeSidebar = () => setIsOpen(false)

  return (
    <div className='layout'>
      {/* Sidebar with isOpen state */}
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />

      <div className='main-container'>
        {/* Header with hamburger toggle */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

export default Layout
