const BASE = "http://127.0.0.1:8000/productos/api/v1/productos/";

export const getAllProductos = () => fetch(BASE).then((res) => res.json());

export const createProducto = (producto) => fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
});

export const deleteProducto = (id) => fetch(`${BASE}${id}`, {
    method: "DELETE",
});

export const updateProducto = (id, producto) => fetch(`${BASE}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
});
