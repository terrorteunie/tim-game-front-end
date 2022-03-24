import axios from 'axios';

let token = localStorage.getItem('token');
let headers = {}
if (token) {
    headers.Authorization = 'Bearer ' + token;
}

let axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: headers
});
axiosInstance.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
});

export default axiosInstance;
