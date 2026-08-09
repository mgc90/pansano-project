import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";

import { Dialog } from 'primereact/dialog';
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

/*import { getAllProductos } from "../../api/productos.api";*/
import styles from "./Products.module.css"

import { useFilters } from "../../hooks/useFilters";
import useToast from "../../hooks/useToast";
import { assetUrl } from "../../utils/assets";
import CartItemCounter from "../CartContent/CartItemCounter";
//import stylesy from "../CartContent/CartContent.module.css"


const Products = () => {
  const [data, setData] = useState([]);
  
  const [currentProduct, setCurrentProduct] = useState([]);
  const [visible, setVisible] = useState(false);
  const { cart, buyProducts } = useContext(dataContext);

  const { filterProducts, filters } = useFilters();
  const { displayToast } = useToast();

  const filteredProducts = filterProducts(data)

  

  const showToast = () => {
   displayToast({ severity: 'success', 
    summary: 'Añadido Al Carrito!', detail: "En Carrito" });
  };

  console.log(filteredProducts)
  /*ESTA FUNCIÓN LLAMA A LOS PRODUCTOS DESDE ARCHIVO JSON */
  useEffect(() => {
  
  fetch(assetUrl("data.json"))
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(setData)
    
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });
  
}, []);

  /*useEffect(() => {
    getAllProductos().then(setData);
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

  const dinamicButton = (product) => {
    return(
      cart.some((item) => item.id === product.id) ? 
            (<>
            <h4 className={styles.price} 
            title="Precio en pesos argentinos">
              ${cartedQuanty(product)},00 
            </h4>
            <div className={styles.yaAgregado} 
            title="Producto ya agregado al carrito">
            <p>En Carrito</p> {cartedCounter(product)}
            </div>
            </>
            ) : 
            (<>
            <h4 className={styles.price} 
            title="Precio en pesos argentinos">
              ${product.price},00
            </h4>
            <button className={styles.addButton} 
            onClick={() => buyAndToast(product)} 
            title="Agregar producto al carrito" >
              Agregar al Carrito
            </button>
            </>
            ) 
    )
  }


//console.log(item)

  const handleClickImage = (productId) => {
    setCurrentProduct(filteredProducts.find((item) => 
      item.id === productId));
    setVisible(true);
  }

  const cardsLayout = (products) => {
    return (
      products.map((product) => {  
        return (
        <div className={filters.viewMode === "cards" ? 
        styles["product-card"] : 
        styles["product-list-container"]}
        key={product.id} >
          <img src={assetUrl(product.img)} alt="imgProductCard"
           className={styles.imgCard} 
           onClick={() => {handleClickImage(product.id)}} />
          <h2 title="Nombre del producto" 
          className={styles["productsTitle"]} >{product.name}
          </h2>         
          {dinamicButton(product)}
        </div>)
      })
    )
  }

  const seeCartButton = () => {
    return (
      <Link  to={"/cart"} title="Carrito de compras" >
        <Button label="Ver Mi Carrito" className={styles["confirmBtn"]} />
      </Link>
    )
  }


  return (
    <>
    {
    filteredProducts.length > 0 ?
    ( 
    <>
      {cardsLayout(filteredProducts)}
      {seeCartButton()}
    </>
    ) :
    (
      <div className={styles.loaderContainer}>
        <ProgressSpinner />
      </div>
    )} 
    { filteredProducts === 0 ?
    (<h2 className={styles.noResults} >
      No hay resultados con esa búsqueda.
     </h2>
    ) : null}
    <Dialog header={currentProduct.name} visible={visible} 
    onHide={() => {if (!visible) return; setVisible(false); }} 
    contentClassName={styles.dialogContainer} dismissableMask
    >
      <img src={assetUrl(currentProduct.img)} alt="imgProductCard"  
      className={styles.imgInDialog} 
      />
      <h3 title="Descripción del producto">
        {currentProduct.description}</h3>
      {dinamicButton(currentProduct)}
    </Dialog>
  </>  
 )
};

export default Products;