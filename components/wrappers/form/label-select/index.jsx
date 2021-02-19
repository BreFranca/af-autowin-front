import {
    Select,
    Form
} from 'antd'

const FormItem = Form.Item
const { Option } = Select

const LabelSelect = (props) => {
    const {
        title,
        name,
        values,
        rules
    } = props

    return (
        <FormItem
            label={title}
            name={name}
            rules={rules}
        >
            <Select
                {...props}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {values && values.map((option, index) => <Option key={index} value={option.value}>{option.text}</Option>)}
            </Select>
        </FormItem>
    )
}

export default LabelSelect
