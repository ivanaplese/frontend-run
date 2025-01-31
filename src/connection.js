import axios from "axios";

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL); // Debug log

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://backend-run.vercel.app",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
