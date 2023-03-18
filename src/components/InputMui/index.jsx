import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export const InputMui = ({ children, onBlur, id, title, handleChange, value, type, mask, autoFocus, error, errorText, multiline, select, required, InputProps, inputProps, width }) => {
    
    return (
        <div className='InputMui-Component' style={{flexDirection: 'column', width}} >
            {mask ? 
            <InputMask mask={mask} alwaysShowMask={false} name={id} required={required} onChange={handleChange} value={value} maskChar={null} >
                {(inputProps) => <TextField
                    {...inputProps}
                    autoFocus={autoFocus}
                    type={type || 'text'}
                    error={error}
                    helperText={error ? errorText : ''}
                    margin="dense"
                    label={title}
                    fullWidth
                    variant="outlined"
                    className='input-field'
                    multiline={multiline}
                    FormHelperTextProps={{style:{fontSize: '1.2vw'}}}
                    rows={10}
                    sx={{fontFamily: "Montserrats"}}
                    select={select}
                    inputProps={inputProps}
                    InputProps={InputProps}
                    // InputProps={{style: {borderRadius: '4vw'}}}
                />}
            </InputMask>
            :
            <TextField
                children={children}
                autoFocus={autoFocus}
                name={id} 
                onChange={handleChange}
                value={value}
                required={required}
                type={type || 'text'}
                error={error}
                helperText={error ? errorText : ''}
                margin="dense"
                label={title}
                fullWidth
                variant="outlined"
                className='input-field'
                multiline={multiline}
                FormHelperTextProps={{style:{fontSize: '1.2vw'}}}
                rows={10}
                sx={{fontFamily: "Montserrats"}}
                select={select}
                inputProps={inputProps}
                InputProps={InputProps}
            />
            }
        </div>
    )
}