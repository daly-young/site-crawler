import { Spin } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import './loading.scss';

class Loading extends React.Component {
  render() {
    return <Spin tip={this.props.tip} />;
  }
}
// 记录全局Loading的引用数目，确保全局始终最多只有一个Loading
Loading.totalRecommend = 0;

Loading.newInstance = props => {
  let div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(
    React.createElement(Loading, props || { tip: 'Loading...' }),
    div
  );
  return {
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
  };
};
export default Loading;
