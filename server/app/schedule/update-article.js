'use strict';
const Subscription = require('egg').Subscription;

class UpdateArticle extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 0 */6 * * *', // 每6个小时执行一次
      type: 'worker', // all: 指定所有的 worker 都需要执行 worker:随机指定worker执行
      immediate: true, // 启动立即执行一次
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log(1, '========????????');
    const siteJson = [
      {
        url: 'https://web-api.juejin.im/query',
        name: '掘金',
        type: 'juejin',
      }, {
        url: 'https://segmentfault.com/hottest',
        name: 'segmentfault',
        type: 'segmentfault',
      }, {
        url: 'https://weekly.75team.com',
        name: '360奇舞周刊',
        type: '360',
      }, {
        url: 'http://fex.baidu.com/weekly/',
        name: '百度FEX',
        type: 'baidu',
      }];
    // {
    //   url: 'https://fed.taobao.org/archives/2019/',
    //   name: '淘宝FED',
    // }, {
    //   url: 'https://aotu.io/',
    //   name: '京东O2',
    // }, {
    //   url: 'https://tech.youzan.com/',
    //   name: '有赞',
    // }, {
    //   url: 'https://blog.souche.com/',
    //   name: '大搜车',
    // }
    await this.app.mysql.delete('articles');
    await this.app.mysql.delete('website');

    for (const item of siteJson) {
      const { type, name, url } = item;
      const siteSel = await this.app.mysql.get('website', { type, name });
      console.log(siteSel, '====');
      let id = '';
      if (!siteSel) {
        const update_time = this.app.mysql.literals.now;
        const res = await this.app.mysql.insert('website', { name, update_time, type });
        const resSuucess = res.affectedRows === 1;
        id = resSuucess ? res.insertId : '';
      } else {
        id = siteSel.id;
      }
      const data = await this.ctx.service.crawler.getHotArticle({ type, url, id });
      if (data.length) {
        await this.app.mysql.insert('articles', data);
      }
      // (function(i, that) {
      //   if (data.length) {
      //   }
      // })(i, this);
    }

  }
}

module.exports = UpdateArticle;
