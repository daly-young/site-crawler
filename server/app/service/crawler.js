'use strict';
const Service = require('egg').Service;
const request = require('request');
const cheerio = require('cheerio');
const https = require('https');
// const querystring = require('querystring');
// const qs = require('qs');

class CrawlerService extends Service {
  async getHotArticle(obj) {
    const { url, type, id } = obj;

    if (type === 'segmentfault') {
      return this.getSegfault({ url, id });
    } else if (type === '360') {
      return this.get360({ url, id });
    } else if (type === 'baidu') {
      return this.getBaidu({ url, id });
    } else if (type === 'juejin') {
      return this.getJuejin({ url, id });
    }
    return [];
  }

  async getSegfault(obj) {
    const { id, url } = obj;
    return new Promise((resolve, reject) => {
      request(url, (err, response, body) => {
        if (err) return reject(err);
        if (body) {
          const $ = cheerio.load(body);
          const content = $('.news-list .news-item');
          let length = content.length;
          const list = [];
          while (length--) {
            const $obj = $(content[length]);
            const title = $obj.find('h4').text().replace(/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g, '');
            const url = $obj.find('a').attr('href');
            const sketch = $obj.find('.article-excerpt').text().replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '');
            let img = $obj.find('a').attr('style');
            const author = $obj.find('.author').find('a').text()
              .replace(/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g, '');
            if (img) {
              img = img.split('(')[1].split(')')[0];
            }
            list.push({
              title,
              img,
              url: 'https://segmentfault.com' + url,
              content: sketch,
              update_time: this.app.mysql.literals.now,
              parent_id: id,
              author,
            });
          }
          resolve(list);
          return;
        }
        resolve([]);
      });
    });
  }

  async get360(obj) {
    const { url, id } = obj;
    return new Promise((resolve, reject) => {
      request(url, (err, response, body) => {
        if (err) return reject(err);
        if (body) {
          const $ = cheerio.load(body);
          const content = $('.issue-list li');
          let length = content.length;
          const list = [];
          while (length--) {
            const $obj = $(content[length]);
            const title = $obj.find('a').text().replace(/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g, '');
            const url = $obj.find('a').attr('href');
            const sketch = '';
            let img = '';
            if (img) {
              img = img.split('(')[1].split(')')[0];
            }
            list.push({
              title,
              img,
              url: 'https://weekly.75team.com/' + url,
              content: sketch,
              update_time: this.app.mysql.literals.now,
              parent_id: id,
              author: '360 奇舞',
            });
          }

          resolve(list);
          return;
        }
        resolve([]);
      });
    });
  }

  async getBaidu(obj) {
    const { url, id } = obj;
    return new Promise((resolve, reject) => {
      request(url, (err, response, body) => {
        if (err) return reject(err);
        if (body) {
          const $ = cheerio.load(body);
          const content = $('.post-list li');
          let length = content.length;
          const list = [];
          while (length--) {
            const $obj = $(content[length]);
            const title = $obj.find('p').text().replace(/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g, '');
            const url = $obj.find('a').attr('href');
            const sketch = '';
            const author = $obj.find('span').text().split(' ')[0].replace(/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g, '');
            const img = $obj.find('img').attr('src');
            // const date = $obj.find('span').text().split(' ')[2];

            const domain = 'http://fex.baidu.com';
            list.push({
              title,
              img: domain + img,
              url: domain + url,
              content: sketch,
              update_time: this.app.mysql.literals.now,
              parent_id: id,
              author,
            });
          }

          resolve(list);
          return;
        }
        resolve([]);
      });
    });
  }

  async getJuejin(obj) {
    const { id } = obj;
    const { app } = this;
    return new Promise((resolve, reject) => {
      // if (err) return reject(err);
      // console.log(body, '=====');
      // resolve([]);
      const options = {
        hostname: 'web-api.juejin.im',
        port: 443,
        path: '/query',
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Accept-Encoding': 'utf-8', // 这里设置返回的编码方式 设置其他的会是乱码
          'Accept-Language': 'zh-CN,zh;q=0.8',
          Connection: 'keep-alive',
          // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
          'X-Agent': 'Juejin/Web',
          'Content-Type': 'application/json',
        },
      };

      // 忽略证书验证
      options.agent = new https.Agent({
        rejectUnauthorized: false,
      });

      const params = JSON.stringify({
        extensions: {
          query: {
            id: '653b587c5c7c8a00ddf67fc66f989d42', // ？
          },
        },
        operationName: '',
        query: '',
        variables: {
          after: '',
          category: '5562b415e4b00c57d9b94ac8', // 分类ID
          first: 20, // 数据size
          order: 'POPULAR', // 排序类型
          tags: [],
        },
      });

      const post_req = https.request(options, res => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', chunk => {
          rawData += chunk;
        });
        res.on('end', () => {
          try {
            // const parsedData = JSON.parse(rawData);
            // console.log(typeof rawData, '=====');
            const items = JSON.parse(rawData).data.articleFeed.items.edges;
            const list = items.map(({ node }) => {
              return {
                title: node.title.replace(/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g, ''),
                img: '',
                url: node.originalUrl,
                content: '',
                update_time: app.mysql.literals.now,
                parent_id: id,
                author: node.user.username.replace(/[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g, ''),
              };
            });
            // console.log(list, '====');
            resolve(list);
          } catch (e) {
            return reject(e.message);
          }
        });
      }).on('error', e => {
        return reject(e);
      });
      // 在这里写入需要发送的参数
      post_req.write(params);
      post_req.end();
    });

  }
}

module.exports = CrawlerService;
