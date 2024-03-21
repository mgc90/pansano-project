
import Header from "./panelComponents/Header/Header"
import Sidebar from "./panelComponents/Sidebar/Sidebar"

import "./AdminPanel.css"
import AdminHome from "./panelComponents/AdminHome/AdminHome"

const AdminPanel = () => {
  return (
    <div className="grid-container">
        <h1> adminpanelll</h1>
        <Header />
        <Sidebar />
        <AdminHome />
    </div>
  )
}

export default AdminPanel