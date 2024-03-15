import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import CartItemCounter from "./CartItemCounter";

function CartElements() {
  const { cart, setCart } = useContext(dataContext);

  const deleteProduct = (id) => {
    const foundId = cart.find((elem) => elem.id === id);

    const newCart = cart.filter((elem) => {
      return elem !== foundId;
    });

    setCart(newCart);
    
  };

  return cart.map((product) => {
    return (
      <div className="cartContent" key={product.id}>
        <img src={product.img} alt="productCard" />
        <h3 className="name">{product.name}</h3>
        <CartItemCounter product={product} />
        <h4 className="price">${product.price * product.quanty}</h4>
        <h3 className="cartDeleteButton"onClick={() => deleteProduct(product.id)}>
          ❌
          </h3>
      </div>
    );
  });
};

export default CartElements