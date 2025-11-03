import axios from 'axios';

const options = {
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    withCredentials: true,
    timeout: 20000,
}

export const API = axios.create(options);

API.interceptors.response.use((response) => {
    return response.data;
},
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            window.location.href ="/signin"
        }

        if (status === 500) {
            console.error("Server errror: ", error.response?.data);
        }

        return Promise.reject(error);
    }
)


// API.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("access_token")
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
// )
