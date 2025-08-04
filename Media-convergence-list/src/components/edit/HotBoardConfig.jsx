import { Form, Radio } from 'antd';

const HotBoardConfig = () => {
  return (
    <Form.Item
      label="榜单名称预设"
      name="hotBoardPreset"
    >
      <Radio.Group>
        <Radio value="公众号爆款稿件榜">公众号爆款稿件榜</Radio>
        <Radio value="视频号爆款稿件榜">视频号爆款稿件榜</Radio>
        <Radio value="抖音号爆款稿件榜">抖音号爆款稿件榜</Radio>
      </Radio.Group>
    </Form.Item>
  );
};

export default HotBoardConfig;