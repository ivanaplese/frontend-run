import axios from "axios";

console.log("VUE_APP_API_URL:", process.env.VUE_APP_API_URL); // Debug log

const API_URL = process.env.VUE_APP_API_URL || "https://backend-run.vercel.app";

console.log("Final API_URL:", API_URL); // Debug log

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
