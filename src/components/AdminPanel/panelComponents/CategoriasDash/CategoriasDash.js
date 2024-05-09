import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import { useState } from "react"

import CategoriasList from "../CategoriasList/CategoriasList"


const CategoriasDash = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <CategoriasList />
    </div>
  )
}

export default CategoriasDash