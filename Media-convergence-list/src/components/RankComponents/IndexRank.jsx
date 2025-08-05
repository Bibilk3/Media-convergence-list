import { Table, Select, Button, DatePicker, Modal } from 'antd';
import { DownloadOutlined, LinkOutlined, PictureOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { RankModal } from '../RankModal';

const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟数据
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
];

export const IndexRank = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rankConfig, setRankConfig] = useState({ switch: false, description: '' });

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleSaveConfig = (config) => {
    setRankConfig(config);
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
        <Button icon={<PictureOutlined />} type="default">生成榜单图片</Button>
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