import React, { useState,useEffect} from "react"
import { Form, Input, Radio, Switch,Select,DatePicker} from 'antd';
import moment from "moment";

// 周榜时间范围生成（每周日00:00-周六24:00）
const generateWeekRanges = () => {
    const ranges = [];
    let start = moment("2024-06-30");
    let end = moment("2024-07-06");
    //start（周日）不晚于 “当前周的结束”（当前周六）
    //end（周六）不晚于 “当前日期”（避免生成未来的周榜）。两个条件同时满足时，继续循环。
    while (start.isSameOrBefore(moment().endOf('week')) && 
           end.isSameOrBefore(moment())) {
        // 确保错误：确保定义了lastWeekEnd变量
        const currentDay = moment().day();
        // 正确定义上一周的结束日期（上周日）
        const lastWeekEnd = moment().subtract(1, 'week').endOf('week').subtract(1, 'day');//这里必须要减一天，因为end是周六，而.endOf('week')是周日。

        // 判断当前范围是否是上一周
        const isLastWeek = end.isSame(lastWeekEnd, 'week');
        
        // 周二及之后可以显示所有符合条件的范围（包括上一周）
        // 周一及之前不显示上一周，只显示上上周及更早
        if (currentDay >= 3 || !isLastWeek) {//这里currentDay是从周日开始计算的，因此这里需要从3开始算起
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
  const [form] = Form.useForm();//Ant Design 表单实例，用于操作表单数据（如 setFieldValue 设值、resetFields 重置）
  const [weekOptions, setWeekOptions] = useState(generateWeekRanges());
  const [checkedValues,setCheckedValues]=useState([]);//储存分榜选中的值
  // 添加一个唯一key用于强制更新
  const [radioKey, setRadioKey] = useState(0);
  //将选中值同步到表单
  useEffect(()=>{
    form.setFieldValue('subBoardType',checkedValues);
  },[checkedValues,form]);
  const handleRadioChange=(e)=>{
    const value = e.target.value; // 获取当前点击的值
    let newValues;
    //如果已选中，则取消；未选中则添加
    if(checkedValues.includes(value)){
      newValues=checkedValues.filter(item=>item!==value);
    }
    else{
      newValues=[...checkedValues,value];
    }
    // 更新状态并强制重新渲染单选框
    setCheckedValues(newValues);
    setRadioKey(prevKey => prevKey + 1);
  }
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
          // 可选：验证选中项不为空数组（配合required使用更严谨）
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
        {/* <Space direction="vertical">
          <Select mode="multiple" placeholder="选择分榜类别">
            <Option value="总榜">总榜</Option>
            <Option value="类别1">类别1</Option>
            <Option value="类别2">类别2</Option>
            <Option value="类别3">类别3</Option>
          </Select>
          <div style={{ color: '#666' }}>排序：总榜 类别1 类别2 类别3</div>
        </Space> */}
        {/* 使用key强制重新渲染 */}
        <div key={radioKey} style={{ display: 'flex', gap: '16px', marginBottom: 8 }}>
          <Radio 
            value="总榜"
            checked={checkedValues.includes('总榜')}
            onChange={handleRadioChange}
          >
            总榜
          </Radio>
          <Radio 
            value="类别1"
            checked={checkedValues.includes('类别1')}
            onChange={handleRadioChange}
          >
            类别1
          </Radio>
          <Radio 
            value="类别2"
            checked={checkedValues.includes('类别2')}
            onChange={handleRadioChange}
          >
            类别2
          </Radio>
          <Radio 
            value="类别3"
            checked={checkedValues.includes('类别3')}
            onChange={handleRadioChange}
          >
            类别3
          </Radio>
        </div>
        <div style={{ color: '#666', marginTop: 8 }}>排序：总榜 类别1 类别2 类别3</div>
      </Form.Item>
    </>
  );
};

export default BaseBoardConfig;
