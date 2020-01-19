# site-crawler

[运行地址](http://60.190.217.90:1081/)

功能：
主要收集了**掘金、segmentFault、360 奇舞团、百度 FEX**网站的文章目录汇总，每三小时会重新获取一次目标文章目录。

服务端：`Egg.js` + `MySQL`，请阅读`./server/README.md`

前端：`React.js` + `AntDesign`，请阅读`./web/README.md`

部署采用了 docker-compose，集成文件可参考`./docker-compose.yml`
