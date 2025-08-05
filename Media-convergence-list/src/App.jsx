import {BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';
//BrowserRouter as Router：React Router 提供的路由容器组件，用于包裹整个应用的路由结构，as Router 是起别名，方便后续使用。
//Routes：路由容器，用于包裹所有 Route 组件，决定当前 URL 匹配哪个路由并渲染对应的组件。
//Route：定义单个路由规则，通过 path 指定访问路径，element 指定对应路径要渲染的组件。
import {Layout,Menu} from 'antd';
import 'antd/dist/reset.css';

import UpdateRankPage from './pages/UpdateRankPage';
import SubjectManagementPage from './pages/SubjectManagementPage';
import EditBoardPage from './pages/EditBoardPage';
import RankPage from './pages/RankPage';
import RankImagePage from './pages/RankDisplayPage';

const {Header,Content,Footer}=Layout;

function App(){
  return(
    
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {/* 顶部导航 */}
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{ color: 'white', fontSize: 18, marginLeft: 24 }}>融媒体榜单系统</div>
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
            {/* 其他菜单可在此继续添加 */}
          </Menu>
        </Header>

        {/* 主内容区 */}
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Routes>
            <Route path="/update-rank" element={<UpdateRankPage />} />
            {/* 添加参评主体管理路由 */}
            <Route path="/subject-management" element={<SubjectManagementPage />} />

            <Route path="/edit-board" element={<EditBoardPage />} />

            <Route path="/rank" element={<RankPage />} />

            <Route path="/rank-image" element={<RankImagePage />} />
            {/* 默认路由跳转 */}
            <Route path="/" element={<UpdateRankPage />} />
          </Routes>
        </Content>

        {/* 页脚 */}
        <Footer style={{ textAlign: 'center' }}>
          融媒体榜单系统 ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;

