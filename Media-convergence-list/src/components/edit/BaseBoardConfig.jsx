import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Radio, Checkbox, Switch, Select, DatePicker } from 'antd';
import moment from "moment";

// 周榜时间范围生成
const generateWeekRanges = () => {
    const ranges = [];
    let start = moment("2024-06-30");
    let end = moment("2024-07-06");
    
    while (start.isSameOrBefore(moment().endOf('week')) && 
           end.isSameOrBefore(moment())) {
        const currentDay = moment().day();
        const lastWeekEnd = moment().subtract(1, 'week').endOf('week').subtract(1, 'day');
        const isLastWeek = end.isSame(lastWeekEnd, 'week');
        
        if (currentDay >= 3 || !isLastWeek) {
            ranges.push({
                label: `${start.format("YYYY.MM.DD")} - ${end.format("YYYY.MM.DD")}`,
                value: `${start.format("YYYY-MM-DD")},${end.format("YYYY-MM-DD")}`
            });
        }
        start.add(7, "days");
        end.add(7, "days");
    }
    return ranges;
};

const BaseBoardConfig = () => {
  const [form] = Form.useForm();
  const [weekOptions, setWeekOptions] = useState(generateWeekRanges());
  const [checkedValues, setCheckedValues] = useState([]);
  
  // 处理复选框变化
  const handleCheckChange = useCallback((value) => {
    return (e) => {
      if (e.target.checked) {
        setCheckedValues(prev => [...prev, value]);
      } else {
        setCheckedValues(prev => prev.filter(item => item !== value));
      }
    };
  }, []);
  
  // 同步选中值到表单
  useEffect(() => {
    form.setFieldValue('subBoardType', checkedValues);
  }, [checkedValues, form]);
  
  return (
    <>
      <Form.Item
        label="榜单名称"
        name="boardName"
        rules={[{ required: true, message: '请输入榜单名称' }]}
      >
        <Input placeholder="请输入榜单名称" />
      </Form.Item>

      <Form.Item
        label="榜单起始时间"
        name="startTimeType"
        rules={[{ required: true, message: '请选择榜单类型' }]} 
        initialValue="week"
      >
        <Radio.Group>
          <Radio value="week">周榜</Radio>
          <Radio value="month">月榜</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
            label="榜单起始时间"
            name="startTimeType"
            rules={[{ required: true, message: '请选择榜单类型' }]} 
            initialValue="week"
        >
            {/* <Radio.Group>
            <Radio value="week">周榜</Radio>
            <Radio value="month">月榜</Radio>
            </Radio.Group> */}
            <Form.Item
            label="周榜时间"
            name="weekTime"
            shouldUpdate={(prevValues, currentValues) => 
                prevValues.startTimeType !== currentValues.startTimeType
            }
            >
            <Select placeholder="选择周榜时间">
                {weekOptions.map((item) => (
                <Option key={item.label} value={item.value}>
                    {item.label}
                </Option>
                ))}
            </Select>
            </Form.Item>
        </Form.Item>
    
        {/* 周榜时间：通过shouldUpdate监听startTimeType变化 */}
        
    
        {/* 月榜时间：同样通过shouldUpdate监听 */}
        <Form.Item
            label="月榜时间"
            name="monthTime"
            shouldUpdate={(prevValues, currentValues) => 
            prevValues.startTimeType !== currentValues.startTimeType
            }
        >
            <DatePicker
            picker="month"
            disabledDate={(current) => {
            // 不能选择早于2024年7月的月份
                const minDate = moment('2024-07', 'YYYY-MM').toDate();
                if (current < minDate) {
                return true;
                }
                
                // 不能选择未来的月份,也不能选择本月
                const endOfCurrentMonth = moment().endOf('month').subtract(1,'month').toDate();
                //console.log(endOfCurrentMonth);
                if (current > endOfCurrentMonth) {
                return true;
                }
                
                // 获取当前日期信息
                const today = moment();
                const currentDay = today.date(); // 今天是几号
                const currentMonth = today.month(); // 当前月份(0-11)
                const currentYear = today.year(); // 当前年份
                
                // 获取要判断的月份信息
                const targetMonth = current.month();
                const targetYear = current.year();
                
                // 计算目标月份是否是上一个月
                const isPreviousMonth = (
                (targetYear === currentYear && targetMonth === currentMonth - 1) ||
                (targetYear === currentYear - 1 && targetMonth === 11 && currentMonth === 0)
                );
                
                // 如果是上一个月，且当前日期在5号之前，则禁用
                if (isPreviousMonth && currentDay < 5) {
                return true;
                }
                
                // 其他情况不禁用
                return false;
            }}
            format="YYYY.MM"
            />
        </Form.Item>
      <Form.Item
        label="榜单排名展示"
        name="showRank"
        rules={[{ required: true, message: '请输入展示名次' }]}
      >
        <Input
          placeholder="请输入展示名次（正整数）"
          type="number"
          min={1}
        />
      </Form.Item>

      <Form.Item
        label="分榜"
        name="subBoard"
      >
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked
        />
      </Form.Item>
      
      <Form.Item
        label="分榜类别"
        name="subBoardType"
        rules={[
          { 
            required: true, 
            message: '请至少选择一个分榜类别' 
          },
          {
            validator: (_, value) => {
              if (!value || value.length === 0) {
                return Promise.reject(new Error('请至少选择一个分榜类别'));
              }
              return Promise.resolve();
            }
          }
        ]}
      >
        <div style={{ display: 'flex', gap: '16px', marginBottom: 8 }}>
          <Checkbox 
            value="总榜"
            checked={checkedValues.includes('总榜')}
            onChange={handleCheckChange('总榜')}
          >
            总榜
          </Checkbox>
          <Checkbox 
            value="类别1"
            checked={checkedValues.includes('类别1')}
            onChange={handleCheckChange('类别1')}
          >
            类别1
          </Checkbox>
          <Checkbox 
            value="类别2"
            checked={checkedValues.includes('类别2')}
            onChange={handleCheckChange('类别2')}
          >
            类别2
          </Checkbox>
          <Checkbox 
            value="类别3"
            checked={checkedValues.includes('类别3')}
            onChange={handleCheckChange('类别3')}
          >
            类别3
          </Checkbox>
        </div>
        <div style={{ color: '#666' }}>排序：总榜 类别1 类别2 类别3</div>
      </Form.Item>
    </>
  );
};

export default BaseBoardConfig;
    