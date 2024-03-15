import { Children, createContext, useState, useEffect } from "react";

export const dataContext = createContext();

const DataProvider = ({children}) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const [cart, setCart] = useState(savedCart);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const buyProducts = (product) => {
        const repeatedProduct = cart.find((item) => item.id === product.id);
  
        if(repeatedProduct) {
          setCart(cart.map((item) => item.id === product.id ? {...product, quanty: 
            repeatedProduct.quanty + 1} : item))
        } else {
            setCart([...cart, product]);
        }
      };

    return (
        <dataContext.Provider value={{ cart, setCart, buyProducts }}>
            {children}
        </dataContext.Provider>
    )
};

export default DataProvider;