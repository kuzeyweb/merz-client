import axios from "axios";

const BASE_URL = "http://localhost:6161/"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    
});