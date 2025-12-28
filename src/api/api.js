import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Cambia por la URL de tu backend
});

export default API;
