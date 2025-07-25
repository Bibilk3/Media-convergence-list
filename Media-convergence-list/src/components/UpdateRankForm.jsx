import React, { useState, useEffect } from "react";
import { Form, Select, Button, DatePicker, message } from 'antd';
/* Form：表单容器，提供表单控制、校验等功能。
Select/Option：下拉选择器，用于选择榜单周期和周榜时间。
DatePicker：日期选择器，用于选择月榜时间。
Button：操作按钮（确定 / 取消）。
message：提交后的全局提示反馈。 */
import moment from "moment";//用于解析、格式化和计算日期

const { Option } = Select; //从Select组件中解构出Option子组件，Option用于定义Select的具体选项（如 “月榜”“周榜” 选项）
const { useWatch } = Form; // 从Form中解构useWatch

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

const UpdateRankForm = () => {
    const [form] = Form.useForm();//Ant Design 表单实例，用于操作表单数据（如 setFieldValue 设值、resetFields 重置）
    const [weekOptions, setWeekOptions] = useState(generateWeekRanges());//存储周榜时间选项，初始值由 generateWeekRanges 生成
    
    // 关键：用Form.useWatch监听period字段
    const currentPeriod = useWatch('period', form) || 'month'; // 初始值默认为month,通过 Form.useWatch 实时获取表单中 “period” 字段的值（当前选中的周期），确保与表单同步

    const handlePeriodChange = (value) => {
        form.setFieldValue('period', value);
        //调用form.setFieldValue，将表单中name="period"的字段值设置为当前选中的value（确保表单内部值与用户选择一致）
        form.resetFields(['monthTime', 'weekTime']);
        //调用form.resetFields，重置表单中name="monthTime"（月榜时间）和name="weekTime"（周榜时间）的字段值，避免切换周期后显示之前选择的时间。
    };//定义handlePeriodChange函数，用于处理 “榜单周期” 选择器的变化事件（用户切换 “月榜” 或 “周榜” 时触发），参数value是当前选中的周期值（“month” 或 “week”）

    const onFinish = (values) => {
        // 处理周榜时间格式：将字符串转为对象（便于后续接口调用）
        if (values.period === 'week' && values.weekTime) {
            //如果当前榜单是周榜，并且周榜有值存在
            const [startDate, endDate] = values.weekTime.split(',');
            values.weekTime = { start: startDate, end: endDate };
        }
        console.log('提交参数：', values);// 打印提交的数据
        // 模拟接口请求，1.5秒后显示成功提示
        setTimeout(() => {
            message.success('更新成功！榜单已重新生成');
        }, 1500);
    };

    return (
        <Form
            form={form}//将之前获取的表单实例form绑定到当前表单，使表单受实例控制
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600, margin: "0 auto" }}
        >
            {/* 榜单周期选择 */}
            <Form.Item
                name="period"
                label="榜单周期"
                initialValue="month"
                rules={[{ required: true, message: '请选择榜单周期' }]}//校验规则，required: true表示必填，未选择时显示message提示。
            >
                <Select onChange={handlePeriodChange}>
                    <Option value="month">月榜</Option>
                    <Option value="week">周榜</Option>
                </Select>
            </Form.Item>
            
            {/* 用useWatch返回的currentPeriod判断 */}
            {currentPeriod === 'month' ? (
                <Form.Item
                    name="monthTime"
                    label="时间"
                    rules={[{ required: true, message: '请选择月榜时间' }]}
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
                            console.log(endOfCurrentMonth);
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
                
            ) : (
                <Form.Item
                    name="weekTime"
                    label="时间"
                    rules={[{ required: true, message: '请选择周榜时间' }]}
                >
                    <Select placeholder="选择周榜时间">
                        {weekOptions.map((item) => (
                            <Option key={item.label} value={item.value}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
            
            {/* 按钮区域保持不变 */}
            <Form.Item style={{ textAlign: 'right' }}>
                <Button htmlType="submit" type="primary">确定</Button>
                <Button style={{ marginLeft: 16 }} onClick={() => form.resetFields()}>取消</Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateRankForm;
    