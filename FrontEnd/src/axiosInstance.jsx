import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        console.log(error.response);
        if (error.response?.status == 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                const token = localStorage.getItem("refreshToken")
                const res = await axiosInstance.post('/auth/refresh', {token});
                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch(err){
                console.error(err);
                console.log("Refresh token invalid");
                // window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;