import styles from "./BuyForm.module.css"
import Navbar from "../Navbar/Navbar"
import { useState } from "react";

import { InputText } from "primereact/inputtext";
import { SelectButton } from 'primereact/selectbutton';
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';

import Ticket from "../Ticket/Ticket";


const BuyForm = () => {
  
  const optionsDelivery = ['En el Local', 'A domicilio'];
  const [valueDelivery, setValueDelivery] = useState(optionsDelivery[0]);

  const optionsPay = [ 
    {name: 'Transferencia'},
    {name: 'Efectivo'} ];
  const [valuePay, setValuePay] = useState(null);

  return ( 
    <div className={styles["formContainer"]}>
        <Navbar />
        <h2>Concretar Reserva</h2>
        <form className={styles["buyForm"]}>
          <fieldset className={styles["fields"]}>
            <div >
              <label >Modo de Entrega: </label>
            <SelectButton className={styles["buttonSwitchDelivery"]} value={valueDelivery} onChange={(e) => setValueDelivery(e.value)} options={optionsDelivery} />
            </div>
            <div className="buttonSwitchPay">
              <label >Medio de Pago: </label>
            <SelectButton value={valuePay} onChange={(e) => setValuePay(e.value)} optionLabel="name" options={optionsPay} multiple />
            </div>
            <label className="name-label">Nombre y Apellido: </label>
            <InputText placeholder="Escribí tu Nombre y Apellido" keyfilter="alpha" />
            <label className="num-label">Número WhatsApp: </label> 
            <InputText placeholder="Escribí tu Número WhatsApp" />
    
            {(valueDelivery === "Envío a domicilio") ? 
            (<>
            <label className="name-label">Dirección: </label>
            <InputText placeholder="Escribí tu dirección" />
            <label className="num-label">Ubicación: </label>
            <InputText placeholder="Pegá el link de ubicación" />
            <label className="obs-label">Observaciones:  </label> 
            <InputText placeholder="Indicaciones, límite de tiempo" />
            </>) : (null)
            }
          </fieldset>
        </form>
        <div>
        <Ticket />
        <Link to={"/BuyForm"} title="Concretar Compra">
            <Button label="Confirmar Compra" className={styles["confirmBtn"]} />
        </Link>
        </div>
        
        
    </div>
  )
}

export default BuyForm