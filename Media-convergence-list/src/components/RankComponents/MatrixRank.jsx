import { Table, Select, Button, Modal } from 'antd';
import { DownloadOutlined, LinkOutlined, PictureOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { RankModal } from '../RankModal';
// 1. 引入全局状态
import { useRankStore } from '../../store/rankStore';

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
  
  // 2. 获取全局状态的更新方法
  const { updateSharedData } = useRankStore();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleSaveConfig = (config) => {
    setRankConfig(config);
  };

  // 3. 修正函数定义，移除参数中的updateRankData
  const handleGenerateCard = () => {
    // 矩阵榜数据转换
    const cardFormatData = {
      title: '全媒体矩阵指数榜',
      subTitle: '月榜 2024.09',
      list: mockTableData.map(item => ({
        rank: item.index,
        name: item.subject, // 矩阵榜用主体名称
        score: item.contribution,
        trend: item.index <= 3 ? (item.index === 1 ? 'up' : 'down') : ''
      }))
    };
  
    // 4. 调用全局状态方法，指定类型为"matrix"（矩阵榜标识）
    updateSharedData('matrix', cardFormatData);
    
    // 提示用户切换到榜单图片页
    Modal.success({
      title: '数据已同步',
      content: '请前往"榜单图片"页面查看矩阵榜',
    });
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