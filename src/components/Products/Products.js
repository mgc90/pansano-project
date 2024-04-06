import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";
import getAllProductos from "../../api/productos.api";


import "./Products.css"

const Products = () => {
  const [data, setData] = useState([]);

  const { buyProducts } = useContext(dataContext);

  const { cart } = useContext(dataContext);


  useEffect(() => {
    getAllProductos().then((res) => setData(res.data));
  }, []);

  console.log(data)

  return data.map((product) => {
    return (
        <div className="card" key={product.id}>
            <img src={product.img} alt="imgProductCard" className="imgCard" />
            <h3 title="Nombre del producto">{product.name}</h3>
            <h4 className="price" title="Precio en pesos argentinos">${product.price},00</h4>
            { cart.some((item) => item.id === product.id) ? 
            (<button onClick={() => buyProducts(product)} className="yaAgregado" title="Producto ya agregado al carrito">
              En el Carrito({cart.map(item => item.id === product.id && item.quanty)})
              </button>) : 
            (<button onClick={() => buyProducts(product)}  title="Agregar producto al carrito" >Agregar al Carrito</button>)}
            
        </div>
    )
  });
};

export default Products;