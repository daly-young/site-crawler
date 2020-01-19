// 更改默认create-react-app脚手架的配置
// 这里对ant-design按需引用做了配置，并且不用额外引用其对应的样式
// 增加了babel 的配置，实现动态路由加载
const { override, fixBabelImports, addBabelPresets, addBabelPlugins} = require('customize-cra');

module.exports = override(
   fixBabelImports('import', {
    libraryName: 'antd',
     libraryDirectory: 'es',
     style: 'css',
   }),
   ...addBabelPresets("@babel/preset-react"),
   ...addBabelPlugins("@babel/plugin-syntax-dynamic-import")
);