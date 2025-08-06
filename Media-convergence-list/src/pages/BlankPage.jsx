import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const BlankPage = ({ title }) => {
  return (
    <Content style={{ padding: '0 24px', marginTop: 24 }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280, textAlign: 'center' }}>
        <Title level={2}>{title}</Title>
        <p style={{ marginTop: 40, color: '#666' }}>该功能正在开发中，敬请期待...</p>
      </div>
    </Content>
  );
};

export default BlankPage;