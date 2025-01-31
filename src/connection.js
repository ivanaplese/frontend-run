import axios from "axios";

console.log("import.meta.env:", import.meta.env); // Debug log za provjeru
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL); // Debug log

const API_URL = import.meta.env.VITE_API_URL || "https://backend-run.vercel.app";

console.log("Final API_URL:", API_URL); // Debug log

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
