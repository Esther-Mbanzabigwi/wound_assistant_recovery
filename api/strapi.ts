import axios from "axios";

const strapi = axios.create({
  baseURL: `https://wound-assitant-backend.onrender.com/api`,
  // baseURL: `http://localhost:1337/api`,
});

export default strapi;
