import { useContext } from "react"
import { FiltersContext } from "../components/Context/filtersContext"

/*Hook personalizado construido en base a midulive youtube tienda carrito con react*/ 
export function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext);
    
    
    //funcion para filtrar por
    const filterProducts = (products) => {
      let filteredProducts = products.filter(product => {
        return (
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
      (
        filters.sortByPrice === "majorToMinor" ? 
        filteredProducts.sort((a, b) => b.price - a.price) : 
        filteredProducts.sort((a, b) => a.price - b.price) 
      ) 
        
        return filteredProducts;
    };

    
  
    return { filters, filterProducts, setFilters }
  }