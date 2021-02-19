import {
    Input,
    Form
} from 'antd'

const FormItem = Form.Item
const { TextArea } = Input

const LabelTextArea = (props) => {
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
            <TextArea {...props} />
        </FormItem>
    )
}

export default LabelTextArea
