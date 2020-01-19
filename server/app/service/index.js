'use strict';
const Service = require('egg').Service;

class IndexService extends Service {
  async siteList() {
    const result = await this.app.mysql.select('website');
    // console.log(result, '======website');
    return this.ctx.helper.success(result);
  }

  async articleList(params) {
    const { app, ctx } = this;
    const { id, start, size } = params;
    const result = {};
    // 分页展示
    result.list = await app.mysql.select('articles', {
      where: { parent_id: id },
      orders: [[ 'id', 'desc' ]],
      limit: size,
      offset: start,
    });
    const total = await app.mysql.select('articles', {
      where: { parent_id: id },
    });
    result.total = total.length;
    // console.log(result, '======');

    return ctx.helper.success(result);
  }
}

module.exports = IndexService;

