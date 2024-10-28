import { useContext, useState, useEffect, useRef } from "react";
import { dataContext } from "../Context/DataContext";

/*import { getAllProductos } from "../../api/productos.api";*/
import axios from "axios";
import styles from "./Products.module.css"
import { Image } from 'primereact/image';
import { useFilters } from "../../hooks/useFilters";
import useToast from "../../hooks/useToast";
import CartItemCounter from "../CartContent/CartItemCounter";


const Products = () => {
  const [data, setData] = useState([]);
  const { cart, buyProducts } = useContext(dataContext);

  const { filterProducts } = useFilters();
  const { displayToast } = useToast();

  const filteredProducts = filterProducts(data)

  const imageRef = useRef();

  const showToast = () => {
   displayToast({ severity: 'success', summary: 'Añadido Al Carrito!', detail: "En Carrito" });
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

  const customTemplate = (description) => {
    imageRef.current.show(
      <span className="mask">
        <h3 title="Descripción del producto">{description}</h3>
      </span>
    );
  }
//console.log(item)

  return (filteredProducts.length > 1 ?
    (
      filteredProducts.map((product) => {  
        return (
        <div className={styles["product-card"]} key={product.id}>
            <Image ref={imageRef} src={product.img} alt="imgProductCard" onShow={() => customTemplate(product.description)} imageClassName={styles.imgCard} preview />
            <h2 title="Nombre del producto">{product.name}</h2>
                        
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
        </div>)
      })
    ) :
    (<h2 className={styles.noResults} >No hay resultados con esa búsqueda.</h2>
  )
 )
};

export default Products;