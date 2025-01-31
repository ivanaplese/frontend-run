import axios from "axios";
const apiClient = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: import.meta.env.VITE_API_URL || "https://backend-run.vercel.app/",

    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;