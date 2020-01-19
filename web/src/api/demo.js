import { getPromise } from './base';

export const demoApi = params => {
  return getPromise('/self/doHand?rk=TianTianGetCash', params);
};
