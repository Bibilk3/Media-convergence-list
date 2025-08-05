import { Tabs } from 'antd';
import IndexRankCard from '../components/RankCards/IndexRankCard';
import PopularRankCard from '../components/RankCards/PopularRankCard';
import MatrixRankCard from '../components/RankCards/MatrixRankCard';
import './RankDisplayPage.css';

const { TabPane } = Tabs;

const RankDisplayPage = () => {
  return (
    <div className="rank-display-container">
      <Tabs defaultActiveKey="index" centered>
        <TabPane tab="指数榜" key="index">
          <IndexRankCard />
        </TabPane>
        <TabPane tab="爆款榜" key="popular">
          <PopularRankCard />
        </TabPane>
        <TabPane tab="矩阵榜" key="matrix">
          <MatrixRankCard />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RankDisplayPage;