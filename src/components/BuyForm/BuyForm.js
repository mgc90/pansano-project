import "./BuyForm.css"

import Navbar from "../Navbar/Navbar"
import { useState } from "react";

import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

const BuyForm = () => {

  const [checked, setChecked] = useState(false);

  return (
    
    <div className="formContainer">
        <Navbar />
        <h1>Concretar Reserva</h1>
        <form className="buyForm">
          <fieldset>
            <label id="name-label">Nombre y Apellido: <InputText placeholder="Escribí tu Nombre y Apellido" /></label>
            <label id="name-label">Número WhatsApp: <InputText placeholder="Escribí tu Número" /></label>
            <label id="name-label">Medio de Pago:  <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>  
            <label className="ml-2">Efectivo</label>
            <Checkbox onChange={e => setChecked(e.checked)} checked={checked}>Transferencia</Checkbox></label>
            <label className="ml-2">Transferencia</label>
          </fieldset>
          
        </form>
    </div>
  )
}

export default BuyForm