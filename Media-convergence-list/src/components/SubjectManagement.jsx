// 导入React核心库及必要的Hook
import React, { useState } from'react';
// 导入Ant Design组件库中的所需组件
import { Button, Tabs, Table, Modal, Upload, message, Space } from 'antd';
// 导入Ant Design图标库中的所需图标
import { DownloadOutlined, UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
// 导入Excel解析工具和XLSX库
import { ExcelRenderer } from'react-excel-renderer';
import * as XLSX from 'xlsx';

// 解构Tabs组件的TabPane子组件
const { TabPane } = Tabs;

// 定义表格列配置
const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 80,
    },
    {
        title: '参评主体',
        dataIndex:'subject',
        key:'subject',
    },
    {
        title: '账号名称',
        dataIndex: 'accountName',
        key: 'accountName',
    },
    {
        title: '账号ID',
        dataIndex: 'accountId',
        key: 'accountId',
    },
    {
        title: '类别',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space size="small">
                <Button icon={<EditOutlined />} size="small" type="text">编辑</Button>
                <Button icon={<DeleteOutlined />} size="small" type="text" danger>删除</Button>
            </Space>
        ),
    },
];

// 定义参评主体管理组件
const SubjectManagement = () => {
    // 平台数据状态（按平台分类）
    const [platformData, setPlatformData] = useState({
        微信: [],
        微博: [],
        视频号: [],
        抖音号: [],
        其他: [], // 存放未识别的平台数据
    });
    // 当前激活的平台标签
    const [activePlatform, setActivePlatform] = useState('微信');
    // 上传状态
    const [uploading, setUploading] = useState(false);

    // 下载模板文件
    const handleDownloadTemplate = () => {
        const link = document.createElement('a');
        link.href = '/subject_template.xlsx'; // 模板文件放public目录
        link.download = '参评主体导入模板.xlsx';
        link.click();
    };

    // 处理文件上传（核心：按平台分类直接导入，不做校验）
    const handleFileUpload = async (file) => {
        setUploading(true);
        try {
            // 解析Excel文件
            await new Promise((resolve, reject) => {
                ExcelRenderer(file, (err, resp) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    // 跳过表头行，解析数据（按你的列顺序：第1列参评主体，第2列平台，第3列账号名称，第4列账号ID，第5列类别）
                    const rawData = resp.rows.slice(1).map((row, index) => ({
                        index: index + 1, // 序号
                        subject: String(row[0] || '').trim(), // 第1列：参评主体
                        platform: String(row[1] || '').trim(), // 第2列：平台（用于分类）
                        accountName: String(row[2] || '').trim(), // 第3列：账号名称
                        accountId: String(row[3] || '').trim(), // 第4列：账号ID
                        category: String(row[4] || '').trim(), // 第5列：类别
                    }));
                    resolve(rawData);
                });
            }).then((rawData) => {
                // 按平台分类数据
                const platformMap = {
                    微信: [],
                    微博: [],
                    视频号: [],
                    抖音号: [],
                    其他: [],
                };

                // 遍历数据，按平台归类
                rawData.forEach(item => {
                    // 根据平台字段决定存放位置
                    if (platformMap.hasOwnProperty(item.platform)) {
                        platformMap[item.platform].push(item);
                    } else {
                        // 未识别的平台放"其他"
                        platformMap.其他.push(item);
                    }
                });

                // 更新平台数据（覆盖原有数据）
                setPlatformData(platformMap);
                message.success('导入成功，已按平台分类');
            });
        } catch (err) {
            message.error('文件解析失败，请检查文件格式');
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="subject-management-form">
            {/* 操作按钮区 */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent:'space-between' }}>
                <Space>
                    <Button icon={<DownloadOutlined />} onClick={handleDownloadTemplate}>
                        下载文件模板
                    </Button>
                    <Upload
                        beforeUpload={(file) => {
                            // 仅限制Excel格式
                            const isExcel = ['xlsx', 'xls'].includes(file.name.split('.').pop());
                            if (!isExcel) {
                                message.error('仅支持.xlsx和.xls格式的Excel文件');
                            }
                            return isExcel;
                        }}
                        customRequest={({ file }) => handleFileUpload(file)}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />} loading={uploading} type="primary">
                            导入参评文件
                        </Button>
                    </Upload>
                </Space>
                <div style={{ color:'red', fontSize: 12 }}>
                    *注意：导入后会覆盖对应平台的原有数据
                </div>
            </div>

            {/* 平台标签页（按平台展示数据） */}
            <Tabs
                activeKey={activePlatform}
                onChange={setActivePlatform}
                style={{ marginTop: 16 }}
            >
                <TabPane tab="微信" key="微信">
                    <Table
                        columns={columns}
                        dataSource={platformData.微信}
                        rowKey="accountId" // 用账号ID作为唯一标识
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </TabPane>
                <TabPane tab="微博" key="微博">
                    <Table
                        columns={columns}
                        dataSource={platformData.微博}
                        rowKey="accountId"
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </TabPane>
                <TabPane tab="视频号" key="视频号">
                    <Table
                        columns={columns}
                        dataSource={platformData.视频号}
                        rowKey="accountId"
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </TabPane>
                <TabPane tab="抖音号" key="抖音号">
                    <Table
                        columns={columns}
                        dataSource={platformData.抖音号}
                        rowKey="accountId"
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </TabPane>
                <TabPane tab="其他" key="其他">
                    <Table
                        columns={columns}
                        dataSource={platformData.其他}
                        rowKey="accountId"
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default SubjectManagement;