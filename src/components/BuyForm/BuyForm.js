import "./BuyForm.css"

import Navbar from "../Navbar/Navbar"
import { useState } from "react";

import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from 'primereact/selectbutton';

const BuyForm = () => {

  const [cashChecked, setCashChecked] = useState(false);
  const [transChecked, setTransChecked] = useState(false);

  const options = ['Retira en Local', 'Envío a domicilio'];
  const [value, setValue] = useState(options[0]);

  return (
    
    <div className="formContainer">
        <Navbar />
        <h1>Concretar Reserva</h1>
        <form className="buyForm">
          <fieldset className="fields">
            <label id="name-label">Nombre y Apellido: <InputText placeholder="Escribí tu Nombre y Apellido" /></label>
            <label id="num-label">Número WhatsApp: <InputText placeholder="Escribí tu Número" /></label>
              
              <div className="payCheckContainer">
              <label id="pay-label">Medio de Pago:
               
              <label className="ml-2">TRANSFERENCIA</label>
              <Checkbox onChange={e => setTransChecked(e.checked)} checked={transChecked}></Checkbox>
              <label className="ml-2">EFECTIVO</label>
              <Checkbox onChange={e => setCashChecked(e.checked)} checked={cashChecked}></Checkbox> 
              
            </label>
            </div>
            <div className="card flex justify-content-center">
            <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
            </div>
            {(value === "Envío a domicilio") ? 
            (<><label id="name-label">Dirección: <InputText placeholder="Escribí tu dirección" /></label>
            <label id="num-label">Ubicación: <InputText placeholder="Pegá el link de ubicación" /></label>
            </>) :
              (null)
            }
          </fieldset>
          
        </form>
    </div>
  )
}

export default BuyForm