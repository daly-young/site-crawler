import { getPromise } from './base';

export const getSiteList = params => {
  return getPromise('/daliyArticles/list/site', params);
};

export const getSiteHot = params => {
  return getPromise('/daliyArticles/list/hot', params);
};
