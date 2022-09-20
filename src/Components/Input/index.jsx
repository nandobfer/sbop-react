import { Field } from 'formik';
import MaskedInput from 'react-text-mask';
import './style.scss';

const Input = ({id, value, mask, placeholder, disabled, handleChange, handleBlur, className}) => {
    return (
        <Field name={id}>
            {({field}) => (
                mask 
                ? <MaskedInput 
                    {...field}
                    mask={mask}
                    disabled={disabled}
                    id={id}
                    placeholder={placeholder}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={className}
                />
                : <input 
                    {...field}
                    disabled={disabled}
                    id={id}
                    placeholder={placeholder}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={className}
                />
            )}
        </Field>
    )
}

export default Input