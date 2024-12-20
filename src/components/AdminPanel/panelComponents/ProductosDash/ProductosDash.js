import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import { useState } from "react"

import ProductosList from "../ProductosList/ProductosList"
import "./ProductosDash.css"


const ProductosDash = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <ProductosList />
    </div>
  )
}

export default ProductosDash