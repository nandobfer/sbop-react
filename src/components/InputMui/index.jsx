import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export const InputMui = ({ id, title, handleChange, value, type, mask, autoFocus, error, errorText }) => {
    
    return (
        <div className='InputMui-Component' style={{flexDirection: 'column'}} >
            {mask ? 
            <InputMask mask={mask} alwaysShowMask={false} name={id} required onChange={handleChange} value={value} maskChar={null} >
                {(inputProps) => <TextField
                    {...inputProps}
                    autoFocus={autoFocus}
                    // helperText={passwordError}
                    // error={!!passwordError || false}
                    type={type || 'text'}
                    error={error}
                    helperText={error ? errorText : ''}
                    margin="dense"
                    label={title}
                    fullWidth
                    variant="standard"
                />}
            </InputMask>
            :
            <TextField
                autoFocus={autoFocus}
                // helperText={passwordError}
                // error={!!passwordError || false}
                type={type || 'text'}
                error={error}
                helperText={error ? errorText : ''}
                margin="dense"
                label={title}
                fullWidth
                variant="standard"
                name={id} 
                onChange={handleChange}
                value={value}
                required
            />
            }
        </div>
    )
}