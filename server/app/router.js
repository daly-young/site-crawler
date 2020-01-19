'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { index } = controller;
  router.get('/daliyArticles/list/site', index.siteList);
  router.get('/daliyArticles/list/hot', index.articleList);
};
