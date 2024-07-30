import { useContext } from "react"
import { FiltersContext } from "../components/Context/filtersContext"

/*Hook personalizado construido en base a midulive youtube tienda carrito con react*/ 
export function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext);
    
    
    //funcion para filtrar por categorías
    const filterProducts = (products) => {
      return products.filter(product => {
        return (
          (filters.sortByPrice === "majorToMinor" ? products.sort(function(a, b) {return b.price - a.price}) : products.sort(function(a, b) {return a.price - b.price}) ) &&
          (
            filters.category === "all" ||
            product.category === filters.category 
          ) &&
          (
            !filters.search ? (products) : (
            product.name.toLowerCase().includes(filters.search.toLowerCase()) || 
            product.description.toLowerCase().includes(filters.search.toLowerCase()))
          )
        )
      });
    };
  
    return { filters, filterProducts, setFilters }
  }