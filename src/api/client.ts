import axios from "axios";
const baseURL = import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL;
export const api = axios.create({
    baseURL: baseURL,
    headers: {"Content-Type": "application/json"}
})