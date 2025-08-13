import { Table, Select, Button, DatePicker, Modal } from 'antd';
import { DownloadOutlined, LinkOutlined, PictureOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { RankModal } from '../RankModal';
import { useRankStore } from '../../store/rankStore'; // 引入全局状态

const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟表格数据（保持不变）
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
  // 其他数据...
];

// 移除原有的updateRankData props，通过全局状态同步数据
export const IndexRank = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rankConfig, setRankConfig] = useState({ switch: false, description: '' });
  
  // 从全局状态获取更新数据的方法
  const { updateSharedData } = useRankStore();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleSaveConfig = (config) => {
    setRankConfig(config);
  };

  const handleGenerateCard = () => {
    // 1. 转换表格数据为卡片所需格式（保持不变）
    const cardFormatData = {
      title: '融媒体公众号指数榜',
      subTitle: '镇街榜',
      period: '周榜 2024.09.02-2024.09.12',
      list: mockTableData.map(item => ({
        rank: item.index,
        account: item.account,
        score: item.contribution,
        trend: item.index <= 3 ? (item.index === 1 ? 'up' : 'down') : ''
      }))
    };

    // 2. 关键修改：调用全局状态方法，指定类型为"index"（与指数榜对应）
    updateSharedData('index', cardFormatData);
    
    // 3. 提示用户切换到榜单图片页（更新提示文案）
    Modal.success({
      title: '数据已同步',
      content: '请前往"榜单图片"页面查看对应榜单',
    });
  };

  // 表格列定义（保持不变）
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
      {/* 操作按钮区（保持不变，点击事件已绑定到handleGenerateCard） */}
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
          onClick={handleGenerateCard} // 点击生成图片时触发数据同步
        >
          生成榜单图片
        </Button>
        <Button 
          icon={<QuestionCircleOutlined />} 
          type="default" 
          onClick={handleOpenModal}
        >榜单说明</Button>
      </div>

      {/* 表格展示（保持不变） */}
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