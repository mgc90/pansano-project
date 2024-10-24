import { createContext, useState, useEffect } from "react";

export const dataContext = createContext();

const DataProvider = ({children}) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const [cart, setCart] = useState(savedCart);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //console.log(JSON.stringify(cart))

    const buyProducts = (product) => {
        const repeatedProduct = cart.find((item) => item.id === product.id);
  
        if(repeatedProduct) {
          setCart(cart.map((item) => (item.id === product.id) && item.quanty < 10 ? {...product, quanty: 
            repeatedProduct.quanty + 1} : item))
        } else {
            setCart([...cart, product]);
        }
      };

      const deleteProduct = (product) => {
        const foundId = cart.find((elem) => elem.id === product.id);
        const newCart = cart.filter((elem) => {
          return elem !== foundId;
        });
        setCart(newCart);
      };

    return (
        <dataContext.Provider value={{ cart, setCart, buyProducts, deleteProduct }}>
            {children}
        </dataContext.Provider>
    )
};

export default DataProvider;