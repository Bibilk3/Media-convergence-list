// 导入React核心库及必要的Hook
import React, { useState, useEffect } from'react';
// 导入Ant Design组件库中的所需组件
import { Button, Tabs, Table, Modal, Upload, message, Space } from 'antd';
// 导入Ant Design图标库中的所需图标
import { DownloadOutlined, UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
// 导入Excel解析工具（用于解析上传的Excel文件）
import { ExcelRenderer } from'react-excel-renderer';

// 解构Tabs组件的TabPane子组件（用于标签页切换）
const { TabPane } = Tabs;

// 定义表格列配置（与Excel模板字段对应，决定表格显示哪些列）
const columns = [
    {
        title: '序号',       // 列标题
        dataIndex: 'index',  // 对应数据中的字段名
        key: 'index',        // 列的唯一标识
        width: 80,           // 列宽度
    },
    {
        title: '参评主体',
        dataIndex: 'subject',
        key: 'subject',
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
        // 自定义渲染操作按钮（编辑和删除）
        render: (_, record) => (
            <Space size="small">
                <Button icon={<EditOutlined />} size="small" type="text">编辑</Button>
                <Button icon={<DeleteOutlined />} size="small" type="text" danger>删除</Button>
            </Space>
        ),
    },
];

// 定义失败数据表格的列配置（在正常列基础上增加“失败原因”列）
const failColumns = [
    // 过滤掉正常列中的“操作”列
   ...columns.filter(col => col.key!== 'action'),
    {
        title: '失败原因',
        dataIndex: 'failReason',
        key: 'failReason',
        // 渲染失败原因，文字设为红色
        render: (text) => <span style={{ color:'red' }}>{text}</span>,
    },
];

// 定义参评主体管理组件（核心功能组件）
const SubjectManagement = () => {
    // 定义平台数据状态（按微信、微博、视频号、抖音号分类存储数据）
    const [platformData, setPlatformData] = useState({
        微信: [],
        微博: [],
        视频号: [],
        抖音号: [],
    });
    // 定义当前激活的平台标签状态（默认选中“公众号”）
    const [activePlatform, setActivePlatform] = useState('微信');
    // 定义上传状态（用于控制上传按钮的加载动画）
    const [uploading, setUploading] = useState(false);
    // 定义失败数据弹窗的显示状态
    const [failModalVisible, setFailModalVisible] = useState(false);
    // 定义失败数据存储状态（用于展示导入失败的数据及原因）
    const [failData, setFailData] = useState([]);

    // 定义下载模板文件的函数
    const handleDownloadTemplate = () => {
        // 创建一个a标签用于下载
        const link = document.createElement('a');
        // 设置模板文件路径（模板文件需放在public目录下）
        link.href = '/subject_template.xlsx';
        // 设置下载后的文件名
        link.download = '参评主体导入模板.xlsx';
        // 触发点击事件开始下载
        link.click();
    };

    // 定义校验导入数据的函数（处理非空校验和重复校验）
    const validateImportData = (rawData) => {
        // 存储校验通过的数据
        //const validData = [];
        const validData = {
            微信: [],
            微博: [],
            视频号: [],
            抖音号: [],
        };
        const invalidData = {
            微信: [],
            微博: [],
            视频号: [],
            抖音号: [],
            其他: [], // 用于存放平台非法的数据
        };
        // 存储校验失败的数据
        //const invalidData = [];
        // 用于检测参评主体重复的Map
        const subjectMap = new Map();
        // 用于检测账号ID重复的Map
        const accountIdMap = new Map();
        const validPlatforms = ['微信', '微博', '视频号', '抖音号'];
        

        // 遍历原始数据进行校验
        rawData.forEach((item, index) => {
            // 存储当前行的错误信息
            const errors = [];
            const rowNumber = index + 2; // 行号（从2开始，跳过表头）
            
            // 1. 平台字段校验（必须存在且合法）
            if (!item.platform) {
                errors.push(`第${rowNumber}行：平台不能为空`);
            } else if (!validPlatforms.includes(item.platform)) {
                errors.push(`第${rowNumber}行：平台“${item.platform}”不合法（仅支持微信/微博/视频号/抖音号）`);
            }
            // 基础非空校验（检查必填字段是否为空）
            if (!item.subject) errors.push('参评主体不能为空');
            if (!item.accountName) errors.push('账号名称不能为空');
            if (!item.accountId) errors.push('账号ID不能为空');
            if (!item.category) errors.push('类别不能为空');

            // 去重校验（检查参评主体是否重复）
            if (subjectMap.has(item.subject)) {
                errors.push(`参评主体"${item.subject}"重复`);
            } else {
                // 将通过校验的参评主体存入Map
                subjectMap.set(item.subject, true);
            }
            // 去重校验（检查账号ID是否重复）
            if (accountIdMap.has(item.accountId)) {
                errors.push(`账号ID"${item.accountId}"重复`);
            } else {
                // 将通过校验的账号ID存入Map
                accountIdMap.set(item.accountId, true);
            }

            // 格式化数据（添加序号）
            const formattedItem = {
               ...item,
                index: index + 1, // 序号从1开始
                rowNumber: rowNumber,
            };
            // 根据是否有错误分类存储数据
            /* if (errors.length > 0) {
                // 有错误的 data 存入 invalidData，并添加失败原因
                invalidData.push({...formattedItem, failReason: errors.join('；') });
            } else {
                // 无错误的 data 存入 validData
                validData.push(formattedItem);
            } */
           //直接输出，不用报错
           validData[item.platform].push(formattedItem);
           invalidData[item.platform].push(formattedItem);
        });

        // 返回校验结果
        return { validData, invalidData };
    };

    // 定义处理文件上传的函数
    const handleFileUpload = async (file) => {
        // 开始上传，设置上传状态为true（显示加载动画）
        setUploading(true);
        try {
            // 解析Excel文件
            await new Promise((resolve, reject) => {
                // 使用ExcelRenderer解析文件
                ExcelRenderer(file, (err, resp) => {
                    // 解析失败时 reject 错误
                    if (err) {
                        reject(err);
                        return;
                    }
                    // 跳过表头行（从第二行开始取数据），并格式化每一行数据
                    const rawData = resp.rows.slice(1).map((row) => ({
                        // 将单元格值转为字符串并去除首尾空格
                        subject: String(row[0] || '').trim(),
                        accountName: String(row[2] || '').trim(),
                        accountId: String(row[3] || '').trim(),
                        category: String(row[4] || '').trim(),
                        platform: String(row[1] || '').trim(),       // 第2列：平台（关键！用于分配标签页）
                    }));
                    // 解析成功，将处理后的数据 resolve 出去
                    resolve(rawData);
                });
            }).then((rawData) => {
                // 调用校验函数校验数据
                const { validData, invalidData } = validateImportData(rawData);
                //const validData=rawData;
                // 更新当前平台的数据（覆盖原有数据）
                setPlatformData(prev => ({
                   ...prev,
                    //[activePlatform]: validData,
                    微信: validData.微信,       // 用解析出的微信数据覆盖
                    微博: validData.微博,       // 用解析出的微博数据覆盖
                    视频号: validData.视频号,   // 用解析出的视频号数据覆盖
                    抖音号: validData.抖音号    // 用解析出的抖音号数据覆盖 
                }));
                // 如果有失败数据，显示失败数据弹窗
                if (invalidData.length > 0) {
                    setFailData(invalidData);
                    setFailModalVisible(true);
                    message.warning(`导入完成，${invalidData.length}条数据失败`);
                } else {
                    // 全部成功时显示成功提示
                    message.success('全部数据导入成功');
                }
            });
        } catch (err) {
            // 处理解析失败的情况
            message.error('文件解析失败，请检查文件格式');
            console.error('Upload error:', err);
        } finally {
            // 无论成功失败，结束上传状态（关闭加载动画）
            setUploading(false);
        }
    };

    // 定义下载失败数据的函数
    const handleDownloadFailData = () => {
        // 将失败数据转换为工作表
        const worksheet = XLSX.utils.json_to_sheet(failData);
        // 创建新的工作簿
        const workbook = XLSX.utils.book_new();
        // 将工作表添加到工作簿
        XLSX.utils.book_append_sheet(workbook, worksheet, '导入失败数据');
        // 下载工作簿为Excel文件
        XLSX.writeFile(workbook, '参评主体导入失败数据.xlsx');
    };

    // 组件渲染内容
    return (
        <div className="subject-management-form">
            {/* 操作按钮区 */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent:'space-between' }}>
                <Space>
                    {/* 下载模板按钮 */}
                    <Button
                        icon={<DownloadOutlined />}
                        onClick={handleDownloadTemplate}
                    >
                        下载文件模板
                    </Button>
                    {/* 导入文件上传组件 */}
                    <Upload
                        // 上传前的校验（限制文件类型为Excel）
                        beforeUpload={(file) => {
                            const isExcel = file.type.includes('excel') || 
                                ['xlsx', 'xls'].includes(file.name.split('.').pop());
                            if (!isExcel) {
                                message.error('仅支持.xlsx和.xls格式的Excel文件');
                            }
                            return isExcel;
                        }}
                        // 自定义上传逻辑（使用我们定义的handleFileUpload函数）
                        customRequest={({ file }) => handleFileUpload(file)}
                        // 不显示上传列表
                        showUploadList={false}
                    >
                        <Button
                            icon={<UploadOutlined />}
                            // 绑定上传状态（控制加载动画）
                            loading={uploading}
                            // 按钮类型为主要按钮（蓝色）
                            type="primary"
                        >
                            导入参评文件
                        </Button>
                    </Upload>
                </Space>
                {/* 提示信息：导入会覆盖原有数据 */}
                <div style={{ color:'red', fontSize: 12 }}>
                    *注意：导入文件后，原有数据将被覆盖
                </div>
            </div>

            {/* 平台标签页区域（公众号/视频号/抖音号切换） */}
            <Tabs
                // 当前激活的标签页
                activeKey={activePlatform}
                // 切换标签页时的回调函数
                onChange={setActivePlatform}
                style={{ marginTop: 16 }}
            >
                {/* 公众号标签页 */}
                <TabPane tab="微信" key="微信">
                    <Table
                        columns={columns}
                        // 数据源为公众号的数据
                        dataSource={platformData['微信']}
                        // 用账号ID作为每行的唯一标识
                        rowKey="accountId"
                        // 分页配置（每页显示10条）
                        pagination={{ pageSize: 10 }}
                        // 显示边框
                        bordered
                    />
                </TabPane>
                {/* 微博标签页 */}
                <TabPane tab="微博" key="微博">
                    <Table
                        columns={columns}
                        // 数据源为公众号的数据
                        dataSource={platformData['微博']}
                        // 用账号ID作为每行的唯一标识
                        rowKey="accountId"
                        // 分页配置（每页显示10条）
                        pagination={{ pageSize: 10 }}
                        // 显示边框
                        bordered
                    />
                </TabPane>
                {/* 视频号标签页 */}
                <TabPane tab="视频号" key="视频号">
                    <Table
                        columns={columns}
                        dataSource={platformData['视频号']}
                        rowKey="accountId"
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </TabPane>
                {/* 抖音号标签页 */}
                <TabPane tab="抖音号" key="抖音号">
                    <Table
                        columns={columns}
                        dataSource={platformData['抖音号']}
                        rowKey="accountId"
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </TabPane>
            </Tabs>

            {/* 失败数据弹窗 */}
            <Modal
                title="导入失败数据"
                // 控制弹窗显示/隐藏
                open={failModalVisible}
                // 关闭弹窗的回调
                onCancel={() => setFailModalVisible(false)}
                // 弹窗底部按钮
                footer={[
                    <Button key="download" onClick={handleDownloadFailData}>
                        下载失败数据
                    </Button>,
                    <Button key="close" onClick={() => setFailModalVisible(false)}>
                        关闭
                    </Button>,
                ]}
                // 弹窗宽度
                width={800}
            >
                {/* 失败数据表格 */}
                <Table
                    columns={failColumns}
                    dataSource={failData}
                    rowKey="index"
                    pagination={{ pageSize: 5 }}
                    bordered
                />
            </Modal>
        </div>
    );
};

// 导出组件供其他文件使用
export default SubjectManagement;