import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"

import getAllProductos from "../../../../api/productos.api"
import { useState, useEffect } from "react"

import "./ProductosDash.css"


const ProductosDash = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllProductos().then((res) => setData(res.data));
  }, []);

  console.log(data)

  const showProducts = () => {
     return (
      data.map((product) => {
        return (
          <div className="cell">
            
            <img src={product.img} alt="imgProductCard" className="imgList" />
            <h3 className="name-admin" title="Nombre del producto">{product.name}</h3>
            <p title="Descripción del producto">{product.description}</p>
            <h4 className="price-admin" title="Precio en pesos argentinos">${product.price},00</h4>
          </div>
        )
      })
     )
  }

  return (
    <div className='grid-container'>
      <Header />
      <Sidebar />
      <div>
      {showProducts()}
      </div>
    </div>
  )
}

export default ProductosDash