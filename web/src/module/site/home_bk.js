import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { getSiteList } from '../../api/home';
import Hot from './hot';
import '../../assets/styles/home.scss';

const { Header, Content, Footer } = Layout;

// function SiteList(props) {
//   return props.listItems.map((item, index) =>
//     <Menu.Item key={index}>{item.siteName}</Menu.Item>
//   )
// }

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
    // console.log(item)
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
          {/* 导航区域 */}
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['0']}
              style={{ lineHeight: '64px' }}
              onSelect={this.showSelectedSite}
            >
              {/* 导航列表 */}
              {this.state.siteList.map((item, index) => (
                <Menu.Item key={index.toString()} id={item.id}>{item.name}</Menu.Item>
              ))}

              {/* <SiteList listItems={this.state.siteList}></SiteList> */}
            </Menu>
          </Header>
          {/* 内容展示区 */}
          <Content style={{ padding: '0 50px' }}>
            {this.state.siteList.length ? (
              <Hot siteId={this.state.activeSiteId}></Hot>
            ) : (
              <></>
            )}
          </Content>
          {/* 底部 */}
          <Footer style={{ textAlign: 'center' }}>ac web crawler</Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Home;
