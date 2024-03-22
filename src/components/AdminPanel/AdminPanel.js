
import Header from "./panelComponents/Header/Header"
import Sidebar from "./panelComponents/Sidebar/Sidebar"
import AdminHome from "./panelComponents/AdminHome/AdminHome"

import "./AdminPanel.css"
import { useState } from "react"


const AdminPanel = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <AdminHome />
    </div>
  )
}

export default AdminPanel