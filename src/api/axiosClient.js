import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        // 'Content-Type': 'application/json',
    },
});
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
axiosClient.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== '/auth/login' && err.response) {
            // Access Token was expired

            if (err.response.status === 401) {
                originalConfig._retry = true;

                try {
                    const rs = await axiosClient.post('/auth/refresh', {
                        refreshToken: localStorage.getItem('refreshToken'),
                    });

                    const accessToken = rs.data.access_token;

                    if (accessToken) {
                        localStorage.setItem('accessToken', accessToken);
                    }
                    window.location = '/';

                    return axiosClient(originalConfig);
                } catch (_error) {
                    alert('Your session has been expired. Please log in again!');
                    localStorage.clear();
                    window.location = '/login';
                    return Promise.reject(_error);
                }
            }
            // Refresh Token was expired
            if (err.response.status === 403) {
                alert('Your session has been expired. Please log in again!');
                localStorage.clear();
                window.location = '/login';
            }
        }

        return Promise.reject(err);
    },
);

export default axiosClient;
