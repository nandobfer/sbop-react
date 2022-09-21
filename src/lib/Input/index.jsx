import { Field } from 'formik';
import MaskedInput from 'react-text-mask';
import './style.scss';

const Input = (props) => {
    // const props = {
    //     mask: mask,
    //     disabled: disabled,
    //     id: id,
    //     placeholder: placeholder,
    //     type: "text",
    //     className: className,
    //     style: style,
    // }
    return (
        <Field name={props.id}>
            {({field}) => (
                props.mask 
                ? <MaskedInput 
                    {...field}
                    {...props}
                    guide={false}
                />
                : <input 
                    {...field}
                    {...props}
                />
            )}
        </Field>
    )
}

export default Input