import { Card, Tag } from 'antd';
import { UpOutlined, DownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './RankCards.css';

/* const PopularRankCard = () => {
  // 模拟数据
  const rankData = {
    title: '公众号爆款稿件榜',
    subTitle: '月榜 2024.09',
    list: [
      { rank: 1, account: '公众号名称', title: '稿件名称稿件名称稿件名称...', trend: 'up' },
      { rank: 2, account: '公众号名称', title: '稿件名称稿件名称稿件名称...', trend: 'down' },
      { rank: 3, account: '公众号名称', title: '稿件名称稿件名称稿件名称...', trend: 'flat' },
      { rank: 4, account: '公众号名称', title: '稿件名称稿件名称稿件名称...', trend: '' },
      { rank: 5, account: '公众号名称', title: '稿件名称稿件名称稿件名称...', trend: '' },
    ],
  }; */
// 从props接收数据
const PopularRankCard = ({ data }) => {
  // 如果没有数据，显示默认提示
  if (!data || !data.list || data.list.length === 0) {
    return (
      <Card className="rank-card" bordered={false} style={{ width: 260, padding: 20 }}>
        <div style={{ textAlign: 'center', color: '#999' }}>
          暂无数据，请先生成榜单
        </div>
      </Card>
    );
  }
  return (
    <Card className="rank-card" bordered={false} style={{ width: 320 }}>
      <div className="card-header">
        <div className="main-title">{data.title}</div>
        <div className="sub-title">{data.subTitle}</div>
      </div>
      <div className="rank-list">
        {data.list.map((item, idx) => (
          <div className="rank-item" key={idx}>
            <div className="rank-badge" style={{ backgroundColor: badgeColor(idx) }}>
              {item.rank}
            </div>
            <div className="rank-info">
              <div className="account-name">{item.account}</div>
              <div className="article-title">{item.title}</div>
              {item.trend && (
                <Tag 
                  className="trend-tag" 
                  color={trendColor(item.trend)}
                  style={{ marginTop: 4 }}
                >
                  {trendIcon(item.trend)}
                </Tag>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 复用指数榜的辅助函数（或单独维护）
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

export default PopularRankCard;