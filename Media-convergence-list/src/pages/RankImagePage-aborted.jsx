import { useState, useEffect } from 'react';
import { Tabs, Card } from 'antd';
import RankImage from '../components/RankImage';

// 模拟不同榜单的数据
const mockRankData = {
  index: {
    period: '2024年8月第1周',
    category: '镇街榜',
    list: [
      { index: 1, subject: '宁波工会', account: '宁波工会公众号', contribution: 92.12, score: 198.0 },
      { index: 2, subject: '杭州工会', account: '杭州工会公众号', contribution: 89.56, score: 187.2 },
      { index: 3, subject: '温州工会', account: '温州工会公众号', contribution: 87.32, score: 176.8 },
      { index: 4, subject: '绍兴工会', account: '绍兴工会公众号', contribution: 85.12, score: 165.3 },
      { index: 5, subject: '嘉兴工会', account: '嘉兴工会公众号', contribution: 82.78, score: 159.7 },
    ]
  },
  popular: {
    period: '2024年8月第1周',
    category: '全市榜',
    list: [
      { index: 1, subject: '宁波工会', account: '宁波工会公众号', title: '2024年宁波市工会会员福利政策解读' },
      { index: 2, subject: '杭州工会', account: '杭州工会公众号', title: '杭州市职工技能大赛圆满落幕' },
      { index: 3, subject: '温州工会', account: '温州工会公众号', title: '温州市总工会开展夏日送清凉活动' },
      { index: 4, subject: '绍兴工会', account: '绍兴工会公众号', title: '绍兴市职工医疗保险新政策出台' },
      { index: 5, subject: '嘉兴工会', account: '嘉兴工会公众号', title: '嘉兴市劳模先进事迹报告会举行' },
    ]
  },
  matrix: {
    period: '2024年8月第1周',
    category: '全平台',
    list: [
      { index: 1, subject: '宁波工会', contribution: 92.12, score: 198.0 },
      { index: 2, subject: '杭州工会', contribution: 89.56, score: 187.2 },
      { index: 3, subject: '温州工会', contribution: 87.32, score: 176.8 },
      { index: 4, subject: '绍兴工会', contribution: 85.12, score: 165.3 },
      { index: 5, subject: '嘉兴工会', contribution: 82.78, score: 159.7 },
    ]
  }
};

const RankImagePage = () => {
  const [activeTab, setActiveTab] = useState('index');
  const [currentData, setCurrentData] = useState(mockRankData.index);

  // 当切换标签时更新数据
  useEffect(() => {
    setCurrentData(mockRankData[activeTab]);
  }, [activeTab]);

  return (
    <Card style={{ margin: 24 }}>
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        style={{ marginBottom: 20 }}
      >
        <Tabs.TabPane tab="指数榜图片" key="index" />
        <Tabs.TabPane tab="爆款榜图片" key="popular" />
        <Tabs.TabPane tab="矩阵榜图片" key="matrix" />
      </Tabs>
      
      <RankImage 
        currentRankType={activeTab} 
        rankData={currentData} 
      />
    </Card>
  );
};

export default RankImagePage;
