var axios = require('axios');

var HTTP_METHODS = require('./methods');

let API_ROOT = 'https://cnodejs.org/api/v1';
module.exports = function(url, method, data) {
  /* 获取后台数据参考的函数,url与后台建立连接，method为method方法其中包括get、post等 */
  let config = {};
  // config.withCredentials = true;
  config.baseURL = API_ROOT;
  config.url = url;
  if (method && method == HTTP_METHODS.GET) {
    config.params = data;
  } else if (
    method &&
    (method == HTTP_METHODS.POST || method == HTTP_METHODS.PUT)
  ) {
    config.data = data;
  }
  config.method = method;
  config.timeout = 8000;
  config.responseType = 'json';

  return axios(config)
    .then(response => {
      var res = response.data;
      var promise = new Promise((resolve, reject) => {
        if (response.status !== 200) {
          reject(res);
        } else {
          if (res.status === 4) {
            localStorage.clear();
            this.$router.push('/');
          } else {
            resolve(res);
          }
        }
      });
      return promise;
    })
    .catch(exp => {
      console.info('exception:', exp);
      return Promise.reject(exp);
    });
};
