import axios from 'axios'

const ventasApi = axios.create({
    baseURL: "http://127.0.0.1:8000/ventas/api/v1/registrar_venta/",
});

export const registroDeVenta = async (data) => {
    try {
        const response = await ventasApi.post("/", data);
        return response;
    } catch (error) {
        throw error;
    }
    
};