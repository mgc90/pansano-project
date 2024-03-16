import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const CartItemCounter = ({ product }) => {
  const { cart, setCart, buyProducts } = useContext(dataContext);

  const decrease = () => {
    const repeatedProduct = cart.find((item) => item.id === product.id);

    repeatedProduct.quanty !== 1 && 
    setCart(cart.map((item) => (item.id === product.id ? {...product, quanty:
    repeatedProduct.quanty - 1} : item)));
  };

  return (
    <div className="quantyCounter">
        <button className='counterButton' onClick={decrease}>- </button>
        <p className="quanty"> {product.quanty} </p>
        <button className='counterButton' onClick={() => buyProducts(product)}>+</button>
    </div>
  )
}

export default CartItemCounter