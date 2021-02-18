import {
    Select,
    Form
} from 'antd'

const FormItem = Form.Item
const { Option } = Select

const LabelSelect = ({
    title,
    name,
    placeholder,
    values,
    showSearch,
    onChange
}) => {
    return (
        <FormItem label={title} name={name}>
            <Select
                showSearch={showSearch}
                placeholder={placeholder}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={onChange}
            >
                {values && values.map((option, index) => <Option key={index} value={option.value}>{option.text}</Option>)}
            </Select>
        </FormItem>
    )
}

export default LabelSelect
