import axios from 'axios';
import Loading from '../components/loading';

// 加载条
let loadingInstance = null;
const prefix = '/api';

const getLoadingInstance = props => {
  Loading.totalRecommend++;

  loadingInstance = loadingInstance || Loading.newInstance(props);
  return loadingInstance;
};

// 更改axios默认配置
axios.defaults.withCredentials = true;

// response拦截器
axios.interceptors.response.use(
  response => {
    // 取消loading
    if (loadingInstance) {
      Loading.totalRecommend--;

      if (!Loading.totalRecommend) {
        loadingInstance.destroy();
        loadingInstance = null;
      }
    }
    return response;
  },
  err => {
    return Promise.reject(err);
  }
);

export const getPromise = (url, data = {}, showLoading = true, extend = {}) => {
  if (showLoading) {
    // 显示loading
    getLoadingInstance();
  }
  return axios
    .get(prefix + url, { params: data, ...extend })
    .then(res => {
      return (res && res.data) || {};
    })
    .catch(err => {
      // 错误处理
      return err;
    });
};

export const postPromise = (
  url,
  data = {},
  showLoading = true,
  extend = {}
) => {
  if (showLoading) {
    // 显示loading
    getLoadingInstance();
  }
  return axios
    .post(prefix + url, data, {
      ...extend
    })
    .then(res => {
      return (res && res.data) || {};
    })
    .catch(err => {
      // 错误处理
      return err;
    });
};
