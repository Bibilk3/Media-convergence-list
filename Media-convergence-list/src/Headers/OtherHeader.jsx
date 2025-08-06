import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export const OtherHeader = () => {
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
        <div style={{ color: 'white', fontSize: 18 }}>其他榜单</div>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/k1']}
            style={{ flex: 1, justifyContent: 'flex-end', marginRight: 50 }}
        >
            <Menu.Item key="/k1">
                k1榜单
            </Menu.Item>
            <Menu.Item key="/k2">
                k2榜单
            </Menu.Item>
            <Menu.Item key="/k3">
                k3榜单
            </Menu.Item>
        </Menu>
    </Header>
  );
};