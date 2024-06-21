import "./Filters.css"

import { useFilters } from "../../hooks/useFilters";

const Filters = () => {
    const { filters, setFilters } = useFilters();

    const handleChangeMinPrice = (event) => {
      setFilters(prevState => ({
        ...prevState,
        minPrice: event.target.value
      }))
    }
   
   const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
   }

      

  return (
    <section className="filters">

      <div>
        <label htmlFor="price">Precio a partir de: </label>
        <input 
          type="range"
          id="price"
          min="0"
          max="18000"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor="category">Categoría: </label>
        <select id="category" onChange={handleChangeCategory} >
          <option value="all">Todas</option>
          <option value="Salado">Salado</option>
          <option value="Dulce">Dulce</option>
          <option value="Almacén">Almacén</option>
        </select>
    </div>
    </section>
    
  )
}

export default Filters