import { useState } from 'react';
import { Form, Card, Modal, message } from 'antd';
import 'antd/dist/reset.css';

// 导入组件
import BoardTypeSelector, { BOARD_TYPES } from '../components/edit/BoardTypeSelector';
import BaseBoardConfig from '../components/edit/BaseBoardConfig';
import IndexBoardConfig from '../components/edit/IndexBoardConfig';
import HotBoardConfig from '../components/edit/HotBoardConfig';
import MatrixBoardConfig from '../components/edit/MatrixBoardConfig';
import BoardActionButtons from '../components/edit/BoardActionButtons';

const EditBoardPage = () => {
  const [form] = Form.useForm();
  const [boardType, setBoardType] = useState('INDEX'); // 默认指数榜
  const [previewVisible, setPreviewVisible] = useState(false);

  // 切换榜单类型时重置表单
  const handleTypeChange = (e) => {
    setBoardType(e.target.value);
    form.resetFields();
  };

  // 校验矩阵榜权重和
  const validateMatrixWeights = (values) => {
    if (boardType !== 'MATRIX') return true;
    
    const weights = values.matrixConfig?.map(item => Number(item.weight)) || [];
    const sum = weights.reduce((acc, cur) => acc + cur, 0);
    
    if (sum !== 100) {
      message.error('矩阵榜同级指标权重和必须为100');
      return false;
    }
    return true;
  };

  // 提交表单
  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        if (validateMatrixWeights(values)) {
          console.log('表单数据：', { ...values, boardType });
          message.success('配置保存成功');
        }
      })
      .catch(info => {
        console.log('校验失败：', info);
      });
  };

  // 预览配置
  const handlePreview = () => {
    form.validateFields()
      .then(values => {
        setPreviewVisible(true);
      })
      .catch(() => {
        message.warning('请先完善必填项');
      });
  };

  return (
    <Card title="编辑榜单" style={{ margin: 24 }}>
      {/* 榜单类型选择 */}
      <BoardTypeSelector 
        value={boardType} 
        onChange={handleTypeChange} 
      />

      {/* 表单内容 */}
      <Form
        form={form}
        layout="vertical"
        initialValues={{ startTimeType: 'week', subBoard: true }}
      >
        {/* 基础配置（通用） */}
        <BaseBoardConfig />
        {/* 类型专属配置 */}
        {boardType === 'INDEX' && <IndexBoardConfig />}
        {boardType === 'HOT' && <HotBoardConfig />}
        {boardType === 'MATRIX' && <MatrixBoardConfig />}

        {/* 操作按钮 */}
        <Form.Item>
          <BoardActionButtons
            onSubmit={handleSubmit}
            onReset={() => form.resetFields()}
            onPreview={handlePreview}
          />
        </Form.Item>
      </Form>

      {/* 预览弹窗 */}
      <Modal
        title={`${BOARD_TYPES[boardType]}配置预览`}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={700}
      >
        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 500, overflow: 'auto' }}>
          {JSON.stringify(form.getFieldsValue(), null, 2)}
        </pre>
      </Modal>
    </Card>
  );
};

export default EditBoardPage;