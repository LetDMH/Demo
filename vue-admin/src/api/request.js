import axios from "axios";
import { getToken } from "@/utils/authority";
import store from "@/store/index";
const $http = axios.create({
    baseURL: "", //process.env.VUE_APP_BASE_API
    timeout: 5000,
});
$http.interceptors.request.use(
    (config) => {
        //每次发送请求都携带cookie
        if (store.getters.token) {
            config.headers["X-Token"] = getToken();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default $http;
