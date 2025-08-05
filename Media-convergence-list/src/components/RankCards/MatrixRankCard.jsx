import { Card, Tag } from 'antd';
import { UpOutlined, DownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './RankCards.css';

const MatrixRankCard = () => {
  // 模拟数据
  const rankData = {
    title: '全媒体矩阵指数榜',
    subTitle: '月榜 2024.09',
    list: [
      { rank: 1, name: '宁波市工会', score: 731.08, trend: 'up' },
      { rank: 2, name: '杭州市工会', score: 731.08, trend: 'down' },
      { rank: 3, name: '杭州市工会', score: 731.08, trend: 'flat' },
      { rank: 4, name: '杭州市工会', score: 731.08, trend: '' },
      { rank: 5, name: '杭州市工会', score: 731.08, trend: '' },
    ],
  };

  return (
    <Card className="rank-card" bordered={false} style={{ width: 260 }}>
      <div className="card-header">
        <div className="main-title">{rankData.title}</div>
        <div className="sub-title">{rankData.subTitle}</div>
      </div>
      <div className="rank-list">
        {rankData.list.map((item, idx) => (
          <div className="rank-item" key={idx}>
            <div className="rank-badge" style={{ backgroundColor: badgeColor(idx) }}>
              {item.rank}
            </div>
            <div className="rank-info">
              <div className="account-name">{item.name}</div>
              <div className="score">
                {item.score} 
                {item.trend && (
                  <Tag 
                    className="trend-tag" 
                    color={trendColor(item.trend)}
                    style={{ marginLeft: 8 }}
                  >
                    {trendIcon(item.trend)}
                  </Tag>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 复用辅助函数
const badgeColor = (index) => {
  const colors = ['#e63946', '#f4a261', '#2a9d8f', '#ffffff', '#ffffff'];
  return colors[index] || '#ffffff';
};

const trendColor = (trend) => {
  return trend === 'up' ? '#2a9d8f' : trend === 'down' ? '#e63946' : '#e9c46a';
};

const trendIcon = (trend) => {
  return trend === 'up' ? <UpOutlined /> : trend === 'down' ? <DownOutlined /> : <ArrowUpOutlined />;
};

export default MatrixRankCard;