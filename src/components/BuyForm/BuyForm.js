import styles from "./BuyForm.module.css"
import Navbar from "../Navbar/Navbar"
import Ticket from "../Ticket/Ticket";

import { useContext } from "react";
import { dataContext } from "../Context/DataContext";
import { useForm } from "react-hook-form";

import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { SelectButton } from 'primereact/selectbutton';


const BuyForm = () => {

  const { register, handleSubmit, formState: {errors}, setValue, watch } = useForm();
  
  const optionsDelivery = ['En el Local', 'A domicilio'];
  const modoEntrega = watch("modoEntrega")

  const optionsPay = ['Transferencia', 'Efectivo'];
  const modoPago = watch("modoPago");

  const { cart, total } = useContext(dataContext);
 
  const chartToSend = cart.map((item) => ({
    id: item.id,
    quanty: item.quanty
  }));

  const chartToSendStrigified = JSON.stringify(chartToSend);
  //console.log(errors)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const showErrors = (field) => {
    return(
      <>
        {
            errors[field] && 
            <span className={styles["errorSpan"]}> {errors[field].message} </span>
        }
      </>
    )
  }

  const deliveryModeField = () => {
      return(
      <>
        <div {...register("modoEntrega", {
                required: {
                  value: true,
                  message: "Modo de entrega requerido"
                }
              })} >
              <label >Seleccione Modo de Entrega: </label>
              <SelectButton value={modoEntrega} className={styles["buttonSwitchDelivery"]} 
                onChange={(e) => setValue("modoEntrega", e.value)} 
                options={optionsDelivery} 
              />
        </div >
          {showErrors("modoEntrega")}
      </>)
  }

  const payModeField = () => {
    return(
      <>
        <div className="buttonSwitchPay">
              <label >Seleccione Medio de Pago: </label>
            <SelectButton value={modoPago} onChange={(e) => setValue("modoPago", e.value)}  
              options={optionsPay}  {...register("modoPago", {
                required: {
                  value: true,
                  message: "Medio de pago es requerido"
                }
              })}
            />
            </div>
            {showErrors("modoPago")}
      </>
    )
  }

  const nameField = () => {
    return(
      <>
        <label className="name-label">Nombre: </label>
            <InputText placeholder="Escribí tu Nombre" keyfilter="alpha" 
              {...register("nombre", {
                required: {
                  value: true,
                  message: "El nombre es requerido"
                },
                minLength: {
                  value: 2,
                  message: "Nombre debe tener al menos 2 caracteres"
                },
                maxLength: {
                  value: 20,
                  message: "Nombre debe tener menos de 20 caracteres"
                }
              })/*Execute function that returns an object, assigned to this input*/}
            />
            {showErrors("nombre")}
      </>
    )
  }

  const apellidoField = () => {
    return(
      <>
        <label className="name-label">Apellido: </label>
            <InputText placeholder="Escribí tu Nombre y Apellido" keyfilter="alpha" 
              {...register("apellido", {
                required: {
                  value: true,
                  message: "El apellido es requerido"
                },
                minLength: {
                  value: 2,
                  message: "Apellido debe tener al menos 2 caracteres"
                },
                maxLength: {
                  value: 20,
                  message: "Apellido debe tener menos de 20 caracteres"
                }
              })/*Execute function that returns an object, assigned to this input*/}
            />
            {showErrors("apellido")}
      </>
    )
  }

  const telefonoField = () => {
    return(
      <>
        <label className="num-label">N° Teléfono: </label> 
            <InputText placeholder="Escribí tu Número WhatsApp" 
              {...register("telefono", {
                required: {
                  value: true,
                  message: "El N° de teléfono es requerido"
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Introduzca sólo números"
                },
                minLength: {
                  value: 8,
                  message: "El N° debe tener al menos 8 caracteres"
                },
                maxLength: {
                  value: 20,
                  message: "El N° debe tener menos de 15 caracteres"
                }
              })}
            />
            {showErrors("telefono")}
      </>
    )
  }

  const hiddenFields = () => { //hidden fields for total and chart to send
    return(
      <>
        <input type="hidden" {...register("carrito")} defaultValue={chartToSendStrigified} />
        <input type="hidden" defaultValue={total} {...register("total")} />
      </>
    )
  }

  const direccionField = () => {
    return(
      <>
        <label className="name-label">Dirección: </label>
            <InputText placeholder="Escribí tu dirección" 
              {...register("direccion", {
                required: {
                  value: true,  //  VER COMO CONDICIONAR PARA QUE SEA FALSE SI SE RETIRA EN LOCAL
                  message: "La dirección es requerida"
                },
                /*pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9'\-\s]+ \d+[a-zA-Z]*$/,
                  message: "Introduzca nombre de calle y numeración"
                },*/
                minLength: {
                  value: 5,
                  message: "Dirección debe tener al menos 5 caracteres"
                },
                maxLength: {
                  value: 70,
                  message: "Dirección debe tener menos de 70 caracteres"
                }
              })}
            />
            {showErrors("direccion")}
      </>
    )
  }

  const ubicacionField = () => {
    return(
      <>  
        <label className="num-label">Ubicación: </label>
            <InputText placeholder="Pegá el link de ubicación" 
              {...register("ubicacion", {
                required: {
                  value: false
                },
                minLength: {
                  value: 10,
                  message: "Ubicación debe tener al menos 10 caracteres"
                },
                maxLength: {
                  value: 100,
                  message: "Ubicación debe tener menos de 100 caracteres"
                }
              })}
            />
            {showErrors("ubicacion")}
      </>
    )
  }

  const observacionesField = () => {
    return(
      <>
        <label className="obs-label">Observaciones:</label> 
            <InputText placeholder="Indicaciones, límite de tiempo" 
              {...register("observaciones")}
            />  
      </>
    )
  }

  return ( 
    <div className={styles["formContainer"]}>
        <Navbar />
        <h2>Concretar Reserva</h2>

        <form className={styles["buyForm"]} onSubmit={onSubmit} >
          <fieldset className={styles["fields"]}>
            {deliveryModeField()}
            {payModeField()}
            {nameField()}
            {apellidoField()}
            {telefonoField()}
            {hiddenFields()}

            { (modoEntrega === 'A domicilio') ? 
            (<>
              {direccionField()}
              {ubicacionField()}
            </>) : (null) }
            
            {observacionesField()}       
          </fieldset>

          <div>
            <Ticket />
          </div>  

          <Button label="Confirmar Compra" type="submit"
            className={styles["confirmBtn"]} />

        </form>
    </div>
  )
}

export default BuyForm