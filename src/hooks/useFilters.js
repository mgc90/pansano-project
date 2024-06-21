import { useContext } from "react"
import { FiltersContext } from "../components/Context/filtersContext"

/*Hook personalizado construido en base a midulive youtube tienda carrito con react*/ 
export function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext);
    
    
    //funcion para filtrar por categorías
    const filterProducts = (products) => {
      return products.filter(product => {
        return (
          product.price >= filters.minPrice &&
          (
            filters.category === "all" ||
            product.category === filters.category
          )
        )
      });
    };
  
    return { filters, filterProducts, setFilters }
  }