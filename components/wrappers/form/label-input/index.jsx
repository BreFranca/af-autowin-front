import {
    Input,
    Form
} from 'antd'

const FormItem = Form.Item

const LabelInput = ({
    title,
    disabled,
    name,
    placeholder,
    onChange
}) => {
    return (
        <FormItem label={title} name={name}>
            <Input onChange={onChange} placeholder={placeholder} disabled={disabled} />
        </FormItem>
    )
}

export default LabelInput
