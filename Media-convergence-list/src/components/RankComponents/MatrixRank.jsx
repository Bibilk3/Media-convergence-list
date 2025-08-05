import { Table, Select, Button, Modal } from 'antd';
import { DownloadOutlined, LinkOutlined, PictureOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { RankModal } from '../RankModal';

const { Option } = Select;

// 模拟数据
const mockTableData = [
  {
    key: '1',
    index: 1,
    subject: '宁波工会',
    contribution: 92.12,
    score1: 92.12,
    score2: 92.12,
    score3: 92.12,
  },
];

export const MatrixRank = () => {
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
    { title: '贡献指数', dataIndex: 'contribution', key: 'contribution' },
    { title: '[榜单名称]贡献指数', dataIndex: 'score1', key: 'score1' },
    { title: '[榜单名称]贡献指数', dataIndex: 'score2', key: 'score2' },
    { title: '[榜单名称]贡献指数', dataIndex: 'score3', key: 'score3' },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center' }}>
        <Select placeholder="周榜" style={{ width: 120 }}>
          <Option value="2019.07">2019.07</Option>
        </Select>
        <Select placeholder="镇街榜" style={{ width: 120 }}>
          <Option value="镇街榜">镇街榜</Option>
        </Select>
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