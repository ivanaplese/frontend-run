import axios from "axios";

console.log("VUE_APP_API_URL:", process.env.VUE_APP_API_URL);

const API_URL = process.env.VUE_APP_API_URL || "https://backend-run.vercel.app";

console.log("Final API_URL:", API_URL);

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
