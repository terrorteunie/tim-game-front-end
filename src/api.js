import axios from 'axios';

let token = localStorage.getItem('token');
let headers = {}
if (token) {
    headers.Authorization = 'Bearer ' + token;
}

export default axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: headers
 });