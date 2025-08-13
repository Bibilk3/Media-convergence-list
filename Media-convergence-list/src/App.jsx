import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css';

// 导入页面组件
import UpdateRankPage from './pages/UpdateRankPage';
import SubjectManagementPage from './pages/SubjectManagementPage';
import EditBoardPage from './pages/EditBoardPage';
import RankPage from './pages/RankPage';
import RankDisplayPage from './pages/RankDisplayPage';
// 导入空白页面组件
import BlankPage from './pages/BlankPage';

import {OmnimediaHeader} from './Headers/OmnimediaHeader';
import { OtherHeader } from './Headers/OtherHeader';

import { RankProvider } from './store/rankStore';

const { Header, Content, Footer, Sider } = Layout;

// 路由判断组件
const HeaderSwitcher = () => {
  const location = useLocation();
  const [currentHeader, setCurrentHeader] = useState(null);

  useEffect(() => {
    // 定义路由匹配规则：主页面路由显示 MainHeader，其他显示 OtherHeader
    const mainRoutes = ['/', '/all-media','/update-rank','/subject-management','/edit-board','/rank','/rank-image'];
    if (mainRoutes.includes(location.pathname)) {
      setCurrentHeader(<OmnimediaHeader />);
    } else {
      setCurrentHeader(<OtherHeader />);
    }
  }, [location.pathname]);

  return currentHeader;
};

function App() {
  return (
    <Router>
      <RankProvider>
        <Layout style={{ minHeight: '100vh' }}>
          {/* 侧边栏导航 */}
          <Sider width={200} style={{ 
            background: '#fff', 
            position: 'fixed', 
            height: '100vh', 
            zIndex: 2 
          }}>
            <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #eee' }}>
              <h2>系统导航</h2>
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={['all-media']}
              style={{ marginTop: 16 }}
            >
              <Menu.Item key="all-media">
                <Link to="/all-media">全媒体榜单</Link>
              </Menu.Item>
              <Menu.Item key="article">
                <Link to="/article">稿件榜单</Link>
              </Menu.Item>
              <Menu.Item key="media-convergence">
                <Link to="/media-convergence">融媒体榜单</Link>
              </Menu.Item>
              <Menu.Item key="admin">
                <Link to="/admin">管理员管理</Link>
              </Menu.Item>
              <Menu.Item key="permission">
                <Link to="/permission">权限组管理</Link>
              </Menu.Item>
            </Menu>
          </Sider>

          {/* 主内容区域 */}
          <Layout style={{ marginLeft: 200 }}>
            {/* 顶部导航 - 关键修改：调整宽度计算方式 */}
            {/* <Header style={{ 
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
            </Header> */}
            {/* 动态渲染 Header */}
            <HeaderSwitcher />

            {/* 页面内容 */}
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
              <Routes>
                {/* 原有路由 */}
                <Route path="/update-rank" element={<UpdateRankPage />} />
                <Route path="/subject-management" element={<SubjectManagementPage />} />
                <Route path="/edit-board" element={<EditBoardPage />} />
                <Route path="/rank" element={<RankPage />} />
                <Route path="/rank-image" element={<RankDisplayPage />} />
                
                {/* 侧边栏路由 */}
                <Route path="/all-media" element={<RankPage />} />
                <Route path="/article" element={<BlankPage title="稿件榜单" />} />
                <Route path="/media-convergence" element={<BlankPage title="融媒体榜单" />} />
                <Route path="/admin" element={<BlankPage title="管理员管理" />} />
                <Route path="/permission" element={<BlankPage title="权限组管理" />} />
                
                {/* 默认路由 */}
                <Route path="/" element={<UpdateRankPage />} />
              </Routes>
            </Content>

            {/* 页脚 */}
            <Footer style={{ textAlign: 'center' }}>
              融媒体榜单系统 ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </RankProvider>
    </Router>
  );
}

export default App;