import axios from "axios";


const blackRockApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});
axios.interceptors.request.use( (config) => {
    // Get token from localstorage
    const token = localStorage.getItem('x-token');

    // If token exists, add it to request headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default blackRockApi;
