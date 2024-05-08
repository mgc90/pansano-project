import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";

/*import { getAllProductos } from "../../api/productos.api";*/

import axios from "axios";
import styles from "./Products.module.css"

const Products = () => {
  const [data, setData] = useState([]);

  const { buyProducts } = useContext(dataContext);

  const { cart } = useContext(dataContext);

  
  /*ESTA FUNCIÓN LLAMA A LOS PRODUCTOS DESDE ARCHIVO JSON */
  useEffect(() => {
    axios("data.json").then((res) => setData(res.data));
  }, []);

  /*useEffect(() => {
    getAllProductos().then((res) => setData(res.data));
  }, []);*/
    /*ESTA FUNCIÓN LLAMA A LOS PRODUCTOS DESDE EL SERVER*/ 
  /*console.log(data)*/

  return data.map((product) => {
    return (
        <div className={styles["product-card"]} key={product.id}>
            <img src={product.img} alt="imgProductCard" className={styles.imgCard} />
            <h2 title="Nombre del producto">{product.name}</h2>
            <h3 title="Descripción del producto">{product.description}</h3>
            <h4 className={styles.price} title="Precio en pesos argentinos">${product.price},00</h4>
            { cart.some((item) => item.id === product.id) ? 
            (<button onClick={() => buyProducts(product)} className={styles.yaAgregado} title="Producto ya agregado al carrito">
              En el Carrito({cart.map(item => item.id === product.id && item.quanty)})
              </button>) : 
            (<button onClick={() => buyProducts(product)}  title="Agregar producto al carrito" >Agregar al Carrito</button>)}
            
        </div>
    )
  });
};

export default Products;