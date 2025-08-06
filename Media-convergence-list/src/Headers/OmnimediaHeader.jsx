import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export const OmnimediaHeader = () => {
  return (
    <Header style={{ 
        position: 'fixed', 
        zIndex: 1, 
        // 核心修复：宽度 = 100% 减去侧边栏宽度
        width: 'calc(100% - 200px)', 
        display: 'flex', 
        alignItems: 'center',
        // 移除多余的 marginLeft，避免重复偏移
        padding: '0 24px' 
    }}>
        <div style={{ color: 'white', fontSize: 18 }}>全媒体榜单</div>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/update-rank']}
            style={{ flex: 1, justifyContent: 'flex-end', marginRight: 50 }}
        >
            <Menu.Item key="/update-rank">
            <Link to="/update-rank">更新榜单数据</Link>
            </Menu.Item>
            <Menu.Item key="/subject-management">
            <Link to="/subject-management">参评主体管理</Link>
            </Menu.Item>
            <Menu.Item key="/edit-board">
            <Link to="/edit-board">编辑榜单</Link>
            </Menu.Item>
            <Menu.Item key="/rank">
            <Link to="/rank">榜单数据</Link>
            </Menu.Item>
            <Menu.Item key="/rank-image">
            <Link to="/rank-image">榜单图片</Link>
            </Menu.Item>
        </Menu>
    </Header>
  );
};