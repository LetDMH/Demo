import axios from 'axios';
axios.defaults.baseURL = 'https://open.duyiedu.com';
axios.interceptors.request.use(
  config => {
    console.log(config);
    config.params = {
      ...config.params,
      appkey: 'ddmh123_1590643639612'
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axios;
