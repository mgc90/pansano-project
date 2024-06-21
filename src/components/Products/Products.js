import { useContext, useState, useEffect, useRef } from "react";
import { dataContext } from "../Context/DataContext";
import { Toast } from 'primereact/toast';
/*import { getAllProductos } from "../../api/productos.api";*/

import axios from "axios";
import styles from "./Products.module.css"
import { Image } from 'primereact/image';

import Filters from "../Filters/Filters";
import { useFilters } from "../../hooks/useFilters";




const Products = () => {
  const [data, setData] = useState([]);

  const { buyProducts } = useContext(dataContext);

  const { cart } = useContext(dataContext);

  const { filterProducts } = useFilters()

  console.log("algo")

  const filteredProducts = filterProducts(data)

  const toast = useRef(null);

    const showToast = () => {
        toast.current.show({ severity: 'success', summary: 'Añadido Al Carrito!', life: 1300 });
    };

  console.log(filteredProducts)
  /*ESTA FUNCIÓN LLAMA A LOS PRODUCTOS DESDE ARCHIVO JSON */
  useEffect(() => {
    axios("data.json").then((res) => setData(res.data));
  }, []);

  /*useEffect(() => {
    getAllProductos().then((res) => setData(res.data));
  }, []);*/
    /*ESTA FUNCIÓN LLAMA A LOS PRODUCTOS DESDE EL SERVER*/ 
  /*console.log(data)*/

  const buyAndToast = (product) => {
    buyProducts(product); 
    showToast()
  }

  return (
    <>
      <Filters />
    {filteredProducts.map((product) => {
      return (
      <div className={styles["product-card"]} key={product.id}>
            <Image src={product.img} alt="imgProductCard" imageClassName={styles.imgCard} preview />
            <h2 title="Nombre del producto">{product.name}</h2>
            <h3 title="Descripción del producto">{product.description}</h3>
            <h4 className={styles.price} title="Precio en pesos argentinos">${product.price},00</h4>
            { cart.some((item) => item.id === product.id) ? 
            (<button onClick={() => buyAndToast(product)} className={styles.yaAgregado} title="Producto ya agregado al carrito">
              En el Carrito({cart.map(item => item.id === product.id && item.quanty)})
             </button>) : 
            (<button onClick={() => buyAndToast(product)} title="Agregar producto al carrito" >Agregar al Carrito</button>)}
           <Toast ref={toast} position="top-center" />
        </div>
    
        
    )}
  )
  }  </>
  )

};

export default Products;