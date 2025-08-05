import { Card, Tag } from 'antd';
import { UpOutlined, DownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './RankCards.css'; // 单独样式文件

const IndexRankCard = () => {
  // 模拟数据（可从 props 传入）
  const rankData = {
    title: '融媒体公众号指数榜',
    subTitle: '[类别名称] 分榜',
    period: '周榜 2024.09.02-2023.09.12',
    list: [
      { rank: 1, account: '公众号名称', score: 731.08, trend: 'up' },   // up/down/flat
      { rank: 2, account: '公众号名称', score: 731.08, trend: 'down' },
      { rank: 3, account: '公众号名称', score: 731.08, trend: 'flat' },
      { rank: 4, account: '公众号名称', score: 731.08, trend: '' },
      { rank: 5, account: '公众号名称', score: 731.08, trend: '' },
    ],
  };

  return (
    <Card className="rank-card" bordered={false} style={{ width: 260 }}>
      <div className="card-header">
        <div className="main-title">{rankData.title}</div>
        <div className="sub-title">{rankData.subTitle}</div>
        <div className="period">{rankData.period}</div>
      </div>
      <div className="rank-list">
        {rankData.list.map((item, idx) => (
          <div className="rank-item" key={idx}>
            <div className="rank-badge" style={{ backgroundColor: badgeColor(idx) }}>
              {item.rank}
            </div>
            <div className="rank-info">
              <div className="account-name">{item.account}</div>
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

// 辅助函数
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

export default IndexRankCard;