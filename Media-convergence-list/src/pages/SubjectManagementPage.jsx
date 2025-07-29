import React from 'react';
import {Layout, Typography} from 'antd';
import SubjectManagement from '../components/SubjectManagement';

const {Content}=Layout;
const {Title}=Typography;

const SubjectManagementPage=()=>{
    return(
        <Content style={{padding:'0 24',marginTop:24}}>
            <div style={{background:'#fff',padding:24,minHeight:280}}>
                <Title level={2}>参评主体管理</Title>
                <SubjectManagement/>
            </div>
        </Content>
    );
};

export default SubjectManagementPage;