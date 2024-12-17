import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:8888/api", // Update base URL if needed
});

// Dynamically include the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
