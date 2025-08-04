import React from "react";
import { Form, Input, Select, Button, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Option } = Select;

// 三级指标组件
const ThirdLevelIndicator = ({ field, remove }) => {
  return (
    <Space align="baseline" style={{ 
      width: "100%", 
      marginBottom: 12, 
      marginLeft: "160px"  // 三级指标缩进
    }}>
      <Form.Item
        {...field}
        name={[field.name, "thirdLevel"]}
        rules={[{ required: true, message: "请选择三级指标" }]}
        style={{ flex: 1 }}
      >
        <Select placeholder="三级指标">
          <Option value="option1">三级指标1</Option>
          <Option value="option2">三级指标2</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={[field.name, "coefficient"]}
        rules={[{ required: true, message: "请输入系数" }]}
        style={{ width: 100 }}
      >
        <Input placeholder="系数" />
      </Form.Item>
      <Button
        type="link"
        danger
        onClick={remove}
        icon={<MinusOutlined />}
        style={{ marginLeft: 8 }}
      >
        删除
      </Button>
    </Space>
  );
};

// 二级指标组件
const SecondLevelIndicator = ({ field, remove, form }) => {
  return (
    <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
      <Space align="baseline" style={{ width: "100%", marginLeft: "80px" }}>
        <Form.Item
          {...field}
          name={[field.name, "secondLevel"]}
          rules={[{ required: true, message: "请输入二级指标名称" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="请输入二级指标名称" />
        </Form.Item>
        <Form.Item
          name={[field.name, "weight2"]}
          rules={[{ required: true, message: "请输入权重" }]}
          style={{ width: 100 }}
        >
          <Input placeholder="权重" />
        </Form.Item>
        <Button
          type="link"
          danger
          onClick={remove}
          icon={<MinusOutlined />}
          style={{ marginLeft: 8 }}
        >
          删除
        </Button>
      </Space>

      <Form.List name={[field.name, "thirdLevelList"]}>
        {(thirdLevelFields, { add: addThird, remove: removeThird }) => (
          <>
            {thirdLevelFields.map((thirdField) => (
              <ThirdLevelIndicator
                key={thirdField.key}
                field={thirdField}
                remove={() => removeThird(thirdField.name)}
              />
            ))}
            <Button
              type="dashed"
              onClick={addThird}
              icon={<PlusOutlined />}
              style={{ marginLeft: "160px", marginTop: 8, marginBottom: 8 }}
            >
              添加三级指标
            </Button>
          </>
        )}
      </Form.List>
    </Space>
  );
};

// 一级指标组件
const FirstLevelIndicator = ({ field, remove, form }) => {
  return (
    <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
      <Space align="baseline" style={{ width: "100%", marginLeft: "40px" }}>
        <Form.Item
          {...field}
          name={[field.name, "firstLevel"]}
          rules={[{ required: true, message: "请输入一级指标名称" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="请输入一级指标名称" />
        </Form.Item>
        <Form.Item
          name={[field.name, "weight1"]}
          rules={[{ required: true, message: "请输入权重" }]}
          style={{ width: 100 }}
        >
          <Input placeholder="权重" />
        </Form.Item>
        <Button
          type="link"
          danger
          onClick={remove}
          icon={<MinusOutlined />}
          style={{ marginLeft: 8 }}
        >
          删除
        </Button>
      </Space>

      <Form.List name={[field.name, "secondLevelList"]}>
        {(secondLevelFields, { add: addSecond, remove: removeSecond }) => (
          <>
            {secondLevelFields.map((secondField) => (
              <SecondLevelIndicator
                key={secondField.key}
                field={secondField}
                form={form}
                remove={() => removeSecond(secondField.name)}
              />
            ))}
            <Button
              type="dashed"
              onClick={addSecond}
              icon={<PlusOutlined />}
              style={{ marginLeft: "120px", marginTop: 8, marginBottom: 8 }}
            >
              添加二级指标
            </Button>
          </>
        )}
      </Form.List>
    </Space>
  );
};

const IndexBoardConfig = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} name="indexBoardConfig" style={{ padding: "20px" }}>
      <Form.List name="indexConfig">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <FirstLevelIndicator
                key={field.key}
                field={field}
                remove={() => remove(field.name)}
                form={form}
              />
            ))}
            <Button
              type="dashed"
              onClick={add}
              icon={<PlusOutlined />}
              style={{ 
                marginLeft: "40px", 
                marginTop: 16, 
                marginBottom: 32
              }}
            >
              添加一级指标
            </Button>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default IndexBoardConfig;