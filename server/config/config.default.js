/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1566454686315_3072';

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your middleware config here
  // config.middleware = [];

  // config.sequelize = {
  //   dialect: 'mysql',
  //   host: process.env.MYSQL_SERVER || '192.168.4.28',
  //   port: process.env.MYSQL_PORT || '10306',
  //   database: 'crawler',
  //   username: 'www',
  //   password: '123456'
  // }

  // config.mysql = {
  //   // 单数据库信息配置
  //   client: {
  //     // host
  //     host: 'localhost',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'root',
  //     // 数据库名
  //     database: 'crawler',
  //     password: 'yangdali',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: process.env.MYSQL_SERVER || '192.168.4.28',
      // 端口号
      port: process.env.MYSQL_PORT || '10306',
      // 用户名
      user: 'www',
      // 数据库名
      database: 'crawler',
      password: '123456',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  config.validate = {
    // 配置参数校验器，基于parameter
    convert: true, // 对参数可以使用convertType规则进行类型转换
  };

  return {
    ...config,
  };
};
