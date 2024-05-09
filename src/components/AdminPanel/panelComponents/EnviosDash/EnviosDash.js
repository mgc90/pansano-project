import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import { useState } from "react"

import EnviosList from "../EnviosList/EnviosList"


const EnviosDash = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <EnviosList />
    </div>
  )
}

export default EnviosDash