import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export const InputMui = ({ children, disabled, id, title, handleChange, value, type, mask, autoFocus, error, errorText, multiline, select, required, InputProps, inputProps, width }) => {

    const custom_style = {
        flexDirection: 'column', 
        
        opacity: disabled && 0.5,
        pointerEvents: disabled && 'none'
    }
    
    return (
        <div className='InputMui-Component' style={custom_style} >
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