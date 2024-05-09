import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import { useState } from "react"

import ClientesList from "../ClientesList/ClientesList"



const ClientesDash = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <ClientesList />
    </div>
  )
}

export default ClientesDash