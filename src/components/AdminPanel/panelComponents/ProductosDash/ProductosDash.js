import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"

import "./ProductosDash.css"
import ProductosList from "../ProductosList/ProductosList"


const ProductosDash = () => {

    
  return (
    <div className='grid-container'>
      <Header />
      <Sidebar />
      <ProductosList />
    </div>
  )
}

export default ProductosDash