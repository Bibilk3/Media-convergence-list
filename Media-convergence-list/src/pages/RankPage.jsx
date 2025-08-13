import { useState } from 'react';
import { Tabs } from 'antd';
import { IndexRank } from '../components/RankComponents/IndexRank';
import { PopularRank } from '../components/RankComponents/PopularRank';
import { MatrixRank } from '../components/RankComponents/MatrixRank';

const { TabPane } = Tabs;

const RankPage = () => {
  // 定义全局榜单数据，分别对应三种类型
  /* const [rankData, setRankData] = useState({
    index: { list: [] },
    popular: { list: [] },
    matrix: { list: [] }
  });
  // 更新卡片数据的方法（传递给各个榜单组件）
  const updateRankData = (type, data) => {
    setRankData(prev => ({
      ...prev,
      [type]: data // 根据类型更新对应的数据
    }));
  }; */
  // 通过 Tabs 切换榜单类型
  return (
    <div style={{ padding: 24 }}>
      {/* <Tabs defaultActiveKey="index" style={{ marginBottom: 24 }}>
        <TabPane tab="指数榜" key="index">
          <IndexRank
            updateRankData={(data) => updateRankData('index', data)} 
          />
        </TabPane>
        <TabPane tab="爆款榜" key="popular">
          <PopularRank 
            updateRankData={(data) => updateRankData('popular', data)}
          />
        </TabPane>
        <TabPane tab="矩阵榜" key="matrix">
          <MatrixRank 
            updateRankData={(data) => updateRankData('matrix', data)}
          />
        </TabPane>
      </Tabs> */}
      <Tabs defaultActiveKey="index">
        {/* 指数榜：传递类型标识"index" */}
        <TabPane tab="指数榜" key="index">
          <IndexRank/>
        </TabPane>
        {/* 爆款榜：传递类型标识"popular" */}
        <TabPane tab="爆款榜" key="popular">
          <PopularRank/>
        </TabPane>
        {/* 矩阵榜：传递类型标识"matrix" */}
        <TabPane tab="矩阵榜" key="matrix">
          <MatrixRank/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RankPage;