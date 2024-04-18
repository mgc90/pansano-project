import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import { useState } from "react"

import PedidosList from "../PedidosList/PedidosList"


const PedidosDash = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <PedidosList />
    </div>
  )
}

export default PedidosDash