import axios from 'axios';

export const api = axios.create({
    // En caso de estar ejecutando la API en loca, reemplazar esta direccion.
    baseURL: 'https://api-antpack-test.herokuapp.com/api',
    
})



