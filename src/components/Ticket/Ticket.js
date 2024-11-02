import styles from "./Ticket.module.css"

import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

const Ticket = () => {

    const { cart } = useContext(dataContext);

    const total = cart.reduce((acc, elem) => acc + elem.price * elem.quanty, 0);

    const ticketHeaders = () => {
      return (
        <div className={styles["ticketDetail"]}>
          <h4 className={styles["name"]}>Nombre del producto</h4>
          <h4 className={styles["quanty"]}>Cantidad</h4>
          <h4 className={styles["price"]}>Precio </h4>
        </div>
      )
    }
    
    const ticketContent = () => {
      return cart.map((product) => {
        return (
          <div className={styles["ticketDetail"]} key={product.id}>
          <p className={styles["named"]} title="Nombre del producto">{product.name}</p>
          <p className={styles["quanted"]} title="Cantidad del producto">{product.quanty}</p>
          <p className={styles["priced"]} title="Precio del producto en Pesos Argentinos">
            ${product.price * product.quanty}
          </p>
        </div>
        )
      })
    }
        
  return (
      <section >
      {ticketHeaders()}
      {ticketContent()}
     
      <div className={styles["total"]}>
        <h2>Total: ${total},00</h2>
      </div>
      </section>
  );
};

export default Ticket;
