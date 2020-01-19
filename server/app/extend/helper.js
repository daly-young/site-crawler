'use strict';

module.exports = {
  success(result) {
    return {
      success: true,
      result,
    };
  },
  fail({ code, msg } = {}) {
    return {
      success: false,
      code,
      resultDes: msg || '服务器类了，请稍后重试',
    };
  },
};
