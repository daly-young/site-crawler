import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Layout, Tabs } from 'antd';
import { getSiteList } from '../../api/home';
import Hot from './hot';
import '../../assets/styles/home.scss';

const {TabPane} = Tabs
const { Footer } = Layout;


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      siteList: [],
      activeSiteId: ''
    };
    this.showSelectedSite = this.showSelectedSite.bind(this);
  }
  showSelectedSite({ item, key, domEvent }) {
    this.setState({
      activeSiteId: item.props.id
    });
  }
  componentDidMount() {
    // 获取所有tabs网站信息列表
    getSiteList().then(({ success, code, result, resultDes }) => {
      if (success) {
        this.setState({
          siteList: result,
          activeSiteId: result[0] && result[0].id
        });
      } else {
        React.$message.error(resultDes || '加载失败，请重试~');
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Layout className="layout">
        <div className="card-container">
          <Tabs type="card">
            {this.state.siteList.map((item, index) => (
              <TabPane tab={item.name} key={index}>
                <Hot siteId={item.id}></Hot>                 
              </TabPane>
            ))}
          </Tabs>
        </div>
          {/* 底部 */}
          <Footer style={{ textAlign: 'center' }}>ac web crawler</Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Home;
