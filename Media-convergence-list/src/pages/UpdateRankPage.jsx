import React from "react";
import UpdateRankForm from '../components/UpdateRankForm';
import {Card} from 'antd';

const UpdateRankPages=()=>{
    //使用箭头函数定义一个函数组件
    return(
        <Card title="更新榜单数据" style={{margin:24}}>
            <UpdateRankForm/>
        </Card>
    );
};

export default UpdateRankPages;