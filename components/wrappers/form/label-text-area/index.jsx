import {
    Input,
    Form
} from 'antd'

const FormItem = Form.Item
const { TextArea } = Input

const LabelTextArea = ({
    title,
    disabled,
    name,
    placeholder,
    onChange,
    rows
}) => {
    return (
        <FormItem label={title} name={name}>
            <TextArea disabled={disabled} rows={rows} onChange={onChange} placeholder={placeholder} />
        </FormItem>
    )
}

export default LabelTextArea
