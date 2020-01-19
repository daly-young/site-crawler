import React from 'react';
import { message } from 'antd';
// 配置全局message弹窗
message.config({
  top: 100,
  duration: 1,
  maxCount: 3
});
React.$message = message;
