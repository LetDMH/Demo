axios.defaults.baseURL = "https://developer.duyiedu.com/vue/bz/";
//设置拦截器配置请求到的data
axios.interceptors.response.use((response) => {
    const { status } = response;
    const { baseURL, url } = response.config;

    if (status === 200) {
        if (url === baseURL + "video") {
            return {
                count: response.data.count,
                data: response.data.data,
            };
        }
        return response.data.data;
    }
    return response;
});
