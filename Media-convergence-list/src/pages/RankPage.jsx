import { useState } from 'react';
import { Tabs } from 'antd';
import { IndexRank } from '../components/RankComponents/IndexRank';
import { PopularRank } from '../components/RankComponents/PopularRank';
import { MatrixRank } from '../components/RankComponents/MatrixRank';

const { TabPane } = Tabs;

const RankPage = () => {
  // 通过 Tabs 切换榜单类型
  return (
    <div style={{ padding: 24 }}>
      <Tabs defaultActiveKey="index" style={{ marginBottom: 24 }}>
        <TabPane tab="指数榜" key="index">
          <IndexRank />
        </TabPane>
        <TabPane tab="爆款榜" key="popular">
          <PopularRank />
        </TabPane>
        <TabPane tab="矩阵榜" key="matrix">
          <MatrixRank />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RankPage;