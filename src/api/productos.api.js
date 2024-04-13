import axios from 'axios'

const productsApi = axios.create({
    baseURL: "http://127.0.0.1:8000/productos/api/v1/productos/",
});

export const getAllProductos = () => productsApi.get("/");

export const createProducto = (producto) => productsApi.post("/", producto);

export const deleteProducto = (id) => productsApi.delete(`/${id}`);

export const updateProducto = (id, producto) => productsApi.put(`/${id}/`, producto);
