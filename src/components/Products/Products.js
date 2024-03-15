import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";

import axios from "axios";

import "./Products.css"

const Products = () => {
  const [data, setData] = useState([]);

  const { buyProducts } = useContext(dataContext);

  useEffect(() => {
    axios.get("data.json").then((res) => setData(res.data));
  }, []);

  return data.map((product) => {
    return (
        <div className="card" key={product.id}>
            <img src={product.img} alt="imgProductCard" className="imgCard" />
            <h3>{product.name}</h3>
            <h4 className="price">${product.price}</h4>
            <button onClick={() => buyProducts(product)}>Agregar al Carrito</button>
        </div>
    )
  });
};

export default Products;