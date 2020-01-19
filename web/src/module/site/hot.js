import React, { useState, useEffect } from 'react';
import { List, Avatar} from 'antd';

import { getSiteHot } from '../../api/home';
// 滚动加载
import InfiniteScroll from 'react-infinite-scroller';

function Hot(props) {
  // let scrollParentRef = null
  const [hotList, setHotList] = useState([]);
  const [loading, handleLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(20)
  const size = 20
  const [start, setStart] = useState(0)

  const fetchData = () => {
    getSiteHot({ 
      id: props.siteId,
      size,
      start
    }).then(
      ({ success, code, result, resultDes }) => {
        if (success) {
          let list = hotList.concat(result.list) 

          // 更新视图
          setHotList(list);
          // 记录所有记录数
          setTotal(result.total)
          // 更改loading
          handleLoading(false)
          // 更改start
          let curStart = start + size
          setStart(curStart)
        } else {
          React.$message.error(resultDes || '加载失败，请重试~');
        }
      }
    );
  }
  const handleInfiniteOnLoad = () => {
    handleLoading(true)
    if (hotList.length >= total) {
      React.$message.warning('加载完成～')
      setHasMore(false)
      handleLoading(false)
      return
    }
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [props.siteId]);

  const defaultImgUrl = 'https://aicaistatic.oss-cn-hangzhou.aliyuncs.com/s/img/201907/23151554520.png'
  return (
    <div className="demo-infinite-container" style={{height: '100%', overflowY: 'scroll'}}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List 
        itemLayout="vertical"
        dataSource={hotList}
        split
        renderItem={item => (
          // <a href={item.url} target={item.id}>
            <List.Item>
              <a href={item.url} target={item.id} style={{color: 'rgba(0, 0, 0, 0.65)'}}>
              <List.Item.Meta
                avatar={<Avatar src={item.img || defaultImgUrl} />}
                title={item.title}
                description={item.author}
              />
              {item.content}
              </a>
              
              {/* <a href={item.url} target={item.id}>{item.content}</a> */}
              {/* <div style={{color: 'rgba(0, 0, 0, 0.65)'}}>{item.content}</div> */} 
            </List.Item>
          // </a>
        )}>
        </List>
      </InfiniteScroll>
    </div>
  );
}
export default Hot;
