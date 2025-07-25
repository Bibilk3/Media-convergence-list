import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//BrowserRouter as Router：React Router 提供的路由容器组件，用于包裹整个应用的路由结构，as Router 是起别名，方便后续使用。
//Routes：路由容器，用于包裹所有 Route 组件，决定当前 URL 匹配哪个路由并渲染对应的组件。
//Route：定义单个路由规则，通过 path 指定访问路径，element 指定对应路径要渲染的组件。
import UpdateRankPage from './pages/UpdateRankPage';
import {Layout} from 'antd';
import 'antd/dist/reset.css';

const {Content}=Layout;

function App(){
  return(
    <Router>{/* 所有路由相关组件必须放在这里面 */}
      <Content id="outer-content"style={{minHeight:'100vh',minWidth:'100vw'}}>{/* 外层内容容器，占满全屏高度 */}
        <Content style={{padding:24}}>{/* 内容容器，设置内边距为 24px，让内容与边缘保持距离*/}
          <Routes>
            {/* <Routes> 是路由容器，内部包含多个 <Route>
            第一个路由：path="/" 表示根路径，对应渲染 UpdateRankPage 组件
            第二个路由：path="/update-rank" 表示 /update-rank 路径，同样渲染 UpdateRankPage 组件
            这意味着访问这两个路径都会显示同一个页面组件 */}
            <Route path="/" element={<UpdateRankPage />} /> 
            <Route path="/update-rank" element={<UpdateRankPage/>}/>
            {/*其他模块后续补充*/}
          </Routes>
        </Content>
      </Content>
    </Router>
  );
}

export default App;