import { Form, Input, Select, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const MatrixBoardConfig = () => {
  return (
    <Form.Item
      label="指标配置"
      name="matrixConfig"
    >
      <Form.List name="matrixConfig">
        {(fields, { add, remove }) => (
          <Space direction="vertical">
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} align="baseline" style={{ width: '100%' }}>
                <Form.Item
                  {...restField}
                  name={[name, 'level1']}
                  rules={[{ required: true, message: '请选择一级指标' }]}
                  style={{ flex: 2 }}
                >
                  <Select placeholder="选择一级指标">
                    <Option value="公众号">公众号</Option>
                    <Option value="视频号">视频号</Option>
                    <Option value="抖音号">抖音号</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name={[name, 'weight']}
                  rules={[{ required: true, message: '请输入权重' }]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="权重（1-100）" />
                </Form.Item>
                
                <Button
                  type="link"
                  danger
                  onClick={() => remove(name)}
                  disabled={fields.length <= 1} // 最后一个不可删除
                >
                  删除
                </Button>
              </Space>
            ))}
            
            <Button 
              type="dashed" 
              onClick={() => add()} 
              icon={<PlusOutlined />}
            >
              添加一级指标
            </Button>
            
            <div style={{ color: '#666', marginTop: 8 }}>
              规则：一级指标不可重复选择，同级权重和为100，最后一个指标不可删除
            </div>
          </Space>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default MatrixBoardConfig;