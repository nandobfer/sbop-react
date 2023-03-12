import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useMembro } from '../../../hooks/useMembro';
import { api } from '../../../api';
import { green } from '@mui/material/colors';
import { LoadingScreen } from '../../../components/LoadingScreen';
import { CircularProgress } from '@mui/material';

export const ResetPassword = ({ open, setOpen }) => {

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [inputError, setInputError] = useState('')

    const buttonSx = {
        ...(success && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
        marginLeft: '2vw'
      };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleButtonClick = () => {
        if (!loading && !success) {
            if (!user) {
                setInputError('Campo obrigatório')
                return
            } else {
                setInputError('')
            }

            setSuccess(false);
            setLoading(true);

            api.post('/login/recover', {input: user})
            .then(response => {
                if (response.data?.email) {
                    setSuccess(true)
                    setEmail(response.data.email)
                }
            })
            .catch(error => console.error(error))
            .finally(() => {
                setLoading(false)
            })

        } else {
            setOpen(false)
        }

    };

    useEffect(() => {
        setSuccess(false)
        setEmail('')
    }, [open])
    
    return (
        <div className='ResetPassword-Component' >
            <Dialog open={open} onClose={() => setOpen(false)}
                disableEscapeKeyDown={true}
                // hideBackdrop={true}
                
            >
                <DialogTitle>Redefinir senha</DialogTitle>
                <form onSubmit={event => event.preventDefault()} style={{display: 'contents'}} >
                    <DialogContent sx={{flexDirection: 'column'}}>
                        <DialogContentText>
                        Enviaremos um link para o e-mail cadastrado com o nome de usuário inserido abaixo. A senha poderá ser redefinida neste link.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            error={Boolean(inputError)}
                            helperText={inputError}
                            id="user"
                            label="Nome de usuário ou e-mail"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(event) => setUser(event.target.value)}
                            value={user}
                        />
                    </DialogContent>
                    <DialogActions>
                        {email && <p>E-mail enviado para: {email}</p>}
                        <Button type='submit' sx={buttonSx} onClick={handleButtonClick}>{loading ? 
                        <CircularProgress
                            size={24}
                            sx={{
                            color: green[500],
                            }}
                        />
                         : 'OK'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}