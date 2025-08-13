import { Table, Select, Button, DatePicker, Modal } from 'antd';
import { DownloadOutlined, LinkOutlined, PictureOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { RankModal } from '../RankModal';
import { useRankStore } from '../../store/rankStore'; // 引入全局状态

const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟表格数据
const mockTableData = [
  {
    key: '1',
    index: 1,
    subject: '宁波工会',
    account: '宁波工会公众号',
    contribution: 92.12,
    score1: 198.0,
    score2: 92.12,
    score3: 92.12,
    score4: 198.0,
  },
  {
    key: '2',
    index: 2,
    subject: '杭州工会',
    account: '杭州工会公众号',
    contribution: 89.56,
    score1: 187.2,
    score2: 89.56,
    score3: 89.56,
    score4: 187.2,
  },
  {
    key: '3',
    index: 3,
    subject: '东平工会',
    account: '东平工会公众号',
    contribution: 9.56,
    score1: 17.2,
    score2: 89.56,
    score3: 89.56,
    score4: 18.2,
  },
  {
    key: '4',
    index: 4,
    subject: '并州工会',
    account: '并州工会公众号',
    contribution: 8.56,
    score1: 87.2,
    score2: 89.56,
    score3: 89.56,
    score4: 87.2,
  },
  // 更多数据...
];

export const IndexRank = ({updateRankData}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rankConfig, setRankConfig] = useState({ switch: false, description: '' });

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleSaveConfig = (config) => {
    setRankConfig(config);
  };

  const handleGenerateCard = () => {
    // 1. 转换表格数据为卡片所需格式
    const cardFormatData = {
      title: '融媒体公众号指数榜',
      subTitle: '镇街榜',
      period: '周榜 2024.09.02-2024.09.12',
      list: mockTableData.map(item => ({
        rank: item.index, // 排名对应表格的index
        account: item.account, // 账号名称
        score: item.contribution, // 指数值
        // 模拟趋势（前3名有趋势，其余无）
        trend: item.index <= 3 ? (item.index === 1 ? 'up' : 'down') : ''
      }))
    };

    // 2. 同步数据到父组件（供第五个标签的卡片使用）
    updateRankData(cardFormatData);
    
    // 3. 提示用户已同步
    Modal.success({
      title: '数据已同步',
      content: '请切换到"榜单卡片"标签查看',
    });
  };

  const columns = [
    { title: '序号', dataIndex: 'index', key: 'index' },
    { title: '参评主体', dataIndex: 'subject', key: 'subject' },
    { title: '账号名称', dataIndex: 'account', key: 'account' },
    { title: '贡献指数', dataIndex: 'contribution', key: 'contribution' },
    { title: '[XXX]得分', dataIndex: 'score1', key: 'score1' },
    { title: '[XXX]得分', dataIndex: 'score2', key: 'score2' },
    { title: '[XXX]得分', dataIndex: 'score3', key: 'score3' },
    { title: '[XXX]得分', dataIndex: 'score4', key: 'score4' },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center' }}>
        <Select placeholder="月榜" style={{ width: 120 }}>
          <Option value="2024.08">2024.08</Option>
        </Select>
        <Select placeholder="镇街榜" style={{ width: 120 }}>
          <Option value="镇街榜">镇街榜</Option>
        </Select>
        <RangePicker style={{ width: 240 }} />
        <Button icon={<DownloadOutlined />} type="primary">导出当前榜单</Button>
        <Button icon={<LinkOutlined />} type="default">复制榜单链接</Button>
        <Button 
          icon={<PictureOutlined />} 
          type="default" 
          onClick={handleGenerateCard} // 绑定点击事件
        >
          生成榜单图片
        </Button>
        <Button 
          icon={<QuestionCircleOutlined />} 
          type="default" 
          onClick={handleOpenModal}
        >榜单说明</Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={mockTableData} 
        bordered 
        pagination={false} 
      />

      <RankModal 
        visible={modalVisible} 
        onCancel={() => setModalVisible(false)} 
        onSave={handleSaveConfig} 
        initialConfig={rankConfig}
      />
    </div>
  );
};