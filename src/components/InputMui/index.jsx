import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export const InputMui = ({ id, title, handleChange, value, type, mask }) => {
    
    return (
        <div className='InputMui-Component' style={{flexDirection: 'column'}} >
            {/* <label htmlFor={id}>{title}</label>
            {mask ? 
            <InputMask mask={mask} alwaysShowMask={false} name={id} required onChange={handleChange} value={value} maskChar={null} /> 
            :
            <input type={type || "text"} name={id} required onChange={handleChange} value={value} />
            } */}
            <InputMask mask={mask} alwaysShowMask={false} name={id} required onChange={handleChange} value={value} maskChar={null} >
                {(inputProps) => <TextField
                    {...inputProps}
                    autoFocus
                    // helperText={passwordError}
                    // error={!!passwordError || false}
                    type={type}
                    margin="dense"
                    label={title}
                    fullWidth
                    variant="standard"
                />}
            </InputMask>
        </div>
    )
}