import axios from "axios";
import {jwtDecode, JwtPayload} from "jwt-decode";

const axiosApi = axios.create({
    baseURL: "http://77.235.25.19:9000",
});


const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("Refresh token missing");
    }

    try {
        const response = await axios.post("http://77.235.25.19:9000/api/v1/users/api/token/refresh/", {
            refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem("accessToken", access);
        return access;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        localStorage.clear();
        throw new Error("Failed to refresh token");
    }
};

axiosApi.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            const now = Date.now() / 1000;

            if (decoded.exp && decoded.exp < now) {
                try {
                    const newAccessToken = await refreshAccessToken();
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                } catch (error) {

                    console.error("Error refreshing token:", error);
                    return Promise.reject(error);
                }
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosApi;