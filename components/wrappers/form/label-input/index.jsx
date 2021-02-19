import {
    Input,
    Form
} from 'antd'

const FormItem = Form.Item

const LabelInput = (props) => {
    const {
        title,
        name,
        rules
    } = props

    return (
        <FormItem
            label={title}
            name={name}
            rules={rules}
        >
            <Input {...props} />
        </FormItem>
    )
}

export default LabelInput
