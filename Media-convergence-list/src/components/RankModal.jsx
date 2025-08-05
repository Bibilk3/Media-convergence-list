import { Modal, Switch, Input, Button } from 'antd';
import { useState } from 'react';
//榜单说明弹窗
export const RankModal = ({ visible, onCancel, onSave, initialConfig }) => {
  const [switchStatus, setSwitchStatus] = useState(initialConfig.switch || false);
  const [description, setDescription] = useState(initialConfig.description || '');

  const handleSwitch = (checked) => {
    setSwitchStatus(checked);
  };

  const handleSave = () => {
    onSave({ switch: switchStatus, description });
    onCancel();
  };

  return (
    <Modal
      title="榜单说明配置弹窗"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>取消</Button>,
        <Button key="submit" type="primary" onClick={handleSave}>确定</Button>
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>*开关：</span>
        <Switch checked={switchStatus} onChange={handleSwitch} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ display: 'block', marginBottom: 4 }}>*榜单说明：</span>
        <Input.TextArea 
          placeholder="最多500个字（支持富文本）" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          maxLength={500} 
          rows={4} 
        />
      </div>
    </Modal>
  );
};