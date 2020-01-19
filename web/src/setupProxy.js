const proxy = require('http-proxy-middleware');
// const rapBaseUrl = 'http://192.168.4.102:9999/mockjsdata/';
const rapBaseUrl = 'http://192.168.4.28:1081/api/'
module.exports = function(app) {
  app.use(
    proxy('/api', {
      // target: rapBaseUrl + '465',
      target: rapBaseUrl,
      pathRewrite: {
        '^/api': ''
    }
    })
  );
};