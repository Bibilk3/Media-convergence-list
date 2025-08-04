import { Button, Space } from 'antd';

const BoardActionButtons = ({ onSubmit, onReset, onPreview }) => {
  return (
    <Space>
      <Button type="primary" htmlType="submit" onClick={onSubmit}>
        确定
      </Button>
      <Button onClick={onReset}>重置</Button>
      <Button danger onClick={onPreview}>
        预览配置
      </Button>
    </Space>
  );
};

export default BoardActionButtons;