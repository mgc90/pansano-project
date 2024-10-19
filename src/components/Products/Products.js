import { useContext, useState, useEffect, useRef } from "react";
import { dataContext } from "../Context/DataContext";
import { Toast } from 'primereact/toast';
/*import { getAllProductos } from "../../api/productos.api";*/
import axios from "axios";
import styles from "./Products.module.css"
import { Image } from 'primereact/image';
import { useFilters } from "../../hooks/useFilters";
import CartItemCounter from "../CartContent/CartItemCounter";



const Products = () => {
  const [data, setData] = useState([]);
  const { buyProducts } = useContext(dataContext);
  const { cart } = useContext(dataContext);
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(data)
  const toast = useRef(null);

  const showToast = () => {
   toast.current.show({ severity: 'success', summary: 'Añadido Al Carrito!', life: 3000 });
  };

  //console.log(filteredProducts)
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
    showToast();
  }

  const cartedCounter = (product) => {
    return cart.map((item) => {
      return ((product.id === item.id ?
        <CartItemCounter inCartProduct={item} /> :
      null))
    })
  }

  const cartedQuanty = (product) => {
    return cart.map((item) => {
      return ((product.id === item.id ?
        item.quanty * product.price :
        null
      ))
    })
  }
//console.log(item)

  return (filteredProducts.map((product) => {
    return (
      <div className={styles["product-card"]} key={product.id}>
            <Image src={product.img} alt="imgProductCard" imageClassName={styles.imgCard} preview />
            <h2 title="Nombre del producto">{product.name}</h2>
            <h3 title="Descripción del producto">{product.description}</h3>
            
            { cart.some((item) => item.id === product.id) ? 
            (<>
            <h4 className={styles.price} title="Precio en pesos argentinos">${cartedQuanty(product)},00</h4>
            <div className={styles.yaAgregado} title="Producto ya agregado al carrito">
              Agregado {cartedCounter(product)}
            </div>
            </>
            ) : 

            (<>
            <h4 className={styles.price} title="Precio en pesos argentinos">${product.price},00</h4>
            <button className={styles.addButton} onClick={() => buyAndToast(product)} title="Agregar producto al carrito" >Agregar al Carrito</button>
            </>
            )
            }
           <Toast ref={toast} position="top-center"  />
      </div>
    )
  }))
};

export default Products;