import "./Filters.css"

import { useFilters } from "../../hooks/useFilters";

const Filters = () => {
    const { filters, setFilters } = useFilters();

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
      
   

  return (
    <section className="filters">

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
          <option value="minorToMajor">Menor a Mayor</option>
          <option value="majorToMinor">Mayor a Menor</option>
        </select>  
    </div>

    <div>
        <input type="text" onChange={searcher} placeholder="Buscar" value={filters.search} className="searchFilter" />
    </div>  

    </section>
    
  )
}

export default Filters