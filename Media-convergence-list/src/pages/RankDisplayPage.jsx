import { Tabs } from 'antd';
import IndexRankCard from '../components/RankCards/IndexRankCard';
import PopularRankCard from '../components/RankCards/PopularRankCard';
import MatrixRankCard from '../components/RankCards/MatrixRankCard';
import { useRankStore } from '../store/rankStore';
import './RankDisplayPage.css';

const { TabPane } = Tabs;

const RankDisplayPage = () => {
   // 2. 从全局状态获取共享数据
  const { sharedData } = useRankStore();

  // 3. 安全处理数据（避免初始状态为undefined）
  const safeData = {
    index: sharedData.index || { list: [] },
    popular: sharedData.popular || { list: [] },
    matrix: sharedData.matrix || { list: [] }
  };
  return (
    <div className="rank-display-container">
      <Tabs defaultActiveKey="index" centered>
        {/* 4. 向卡片组件传递全局状态中的对应数据 */}
        <TabPane tab="指数榜" key="index">
          <IndexRankCard data={safeData.index} />
        </TabPane>
        <TabPane tab="爆款榜" key="popular">
          <PopularRankCard data={safeData.popular} />
        </TabPane>
        <TabPane tab="矩阵榜" key="matrix">
          <MatrixRankCard data={safeData.matrix} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RankDisplayPage;