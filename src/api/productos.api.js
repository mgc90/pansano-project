import axios from 'axios'

const getAllProductos = () => {
    return axios.get("http://127.0.0.1:8000/productos/api/v1/productos/");
}

export default getAllProductos