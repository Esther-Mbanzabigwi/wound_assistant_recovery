import axios from "axios";

const strapi = axios.create({
  baseURL: `https://wound-assitant-backend.onrender.com/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default strapi;
