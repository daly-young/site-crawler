'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  // 网站列表
  async siteList() {
    const { ctx } = this;
    ctx.body = await ctx.service.index.siteList();
  }

  // 文章列表
  async articleList() {
    const { ctx } = this;
    const params = ctx.query;
    // 校验参数
    try {
      ctx.validate({
        id: { type: 'id', required: true },
        start: { type: 'number', allowEmpty: true, default: 0, required: false },
        size: { type: 'number', allowEmpty: true, default: 20, required: false },
      }, params);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = {
        success: false,
        code: 10010,
        resultDes: '参数校验未通过',
      };
      return;
    }

    ctx.body = await ctx.service.index.articleList(params);
  }
}

module.exports = IndexController;
