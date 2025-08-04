import { Radio } from 'antd';

// 榜单类型常量
export const BOARD_TYPES = {
  INDEX: '指数榜',
  HOT: '爆款榜',
  MATRIX: '矩阵榜',
};

const BoardTypeSelector = ({ value, onChange }) => {
  return (
    <Radio.Group value={value} onChange={onChange} style={{ marginBottom: 24 }}>
      <Radio value="INDEX">{BOARD_TYPES.INDEX}</Radio>
      <Radio value="HOT">{BOARD_TYPES.HOT}</Radio>
      <Radio value="MATRIX">{BOARD_TYPES.MATRIX}</Radio>
    </Radio.Group>
  );
};

export default BoardTypeSelector;