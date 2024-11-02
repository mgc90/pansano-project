import "./Filters.css"

import { SelectButton } from 'primereact/selectbutton';

import { useFilters } from "../../hooks/useFilters";

import { useState } from "react";

import { PrimeIcons } from 'primereact/api';

const Filters = () => {
    const { filters, setFilters } = useFilters();
    

    const justifyOptions = [
      {icon: 'pi pi-th-large', value: 'cards'},
      {icon: PrimeIcons.LIST , value: 'list'}
  ];
    const [value, setValue] = useState(justifyOptions[0].value);
    const justifyTemplate = (option) => {
      return <i className={option.icon} style={{ fontSize: '0.7rem', paddingTop: "0" , margin: "0"}}></i>;
  }

    const handleChangeSortByPrice = (event) => {
      setFilters(prevState => ({
        ...prevState,
        sortByPrice: event.target.value
      }))
    }
   
   const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
   }

   const searcher = (event) => {
    setFilters(prevState => ({
      ...prevState,
      search: event.target.value
    }))
   }
      
   const viewMode = (e) => {
    setValue(e.value);
    setFilters(prevState => ({
      ...prevState,
      viewMode: e.target.value
    }))
   }


  return (
    <section className="filters">
      <div >
            <SelectButton  className="switchButton"
               value={value} onChange={viewMode} 
            options={justifyOptions} itemTemplate={justifyTemplate}
            />
        </div>

    <div>
      <label htmlFor="category">Categoría: </label>
        <select id="category" onChange={handleChangeCategory} >
          <option value="all">Todos</option>
          <option value="Salado">Salado</option>
          <option value="Dulce">Dulce</option>
          <option value="Almacén">Almacén</option>
        </select>
    </div>

    <div>
        <label htmlFor="price">Precio: </label>
        <select id="sortByPrice" onChange={handleChangeSortByPrice} >
          <option value="minorToMajor">Menor</option>
          <option value="majorToMinor">Mayor</option>
        </select>  
    </div>

    <div>
        <input type="text" onChange={searcher} placeholder="Buscar" value={filters.search} className="searchFilter" />
    </div>  

    </section>
    
  )
}

export default Filters