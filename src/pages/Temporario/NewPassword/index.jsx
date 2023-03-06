import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { api } from '../../../api';
import { useMembro } from '../../../hooks/useMembro';

export const NewPassword = ({ open, setOpen }) => {

    const [membro, setMembro] = useMembro()

    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmationError, setConfirmationError] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason == "backdropClick") {
            return
        } else {
            if (password) {
                if (password == confirmation) {
                    setOpen(false);
                    setConfirmationError('')
                    api.post('/member/update/password', {password, id: membro.id})
                    .then(response => console.log(response.data))
                } else {
                    setConfirmationError('As senhas precisam ser iguais')
                }
            setPasswordError('')
            } else {
                setPasswordError('Preencha a senha')
            }
        }
    };
    
    return (
        <div className='NewPassword-Component' >
            <Dialog open={open} onClose={handleClose}
                disableEscapeKeyDown={true}
                hideBackdrop={true}
                
            >
                <DialogTitle>Atualize sua senha</DialogTitle>
                <form onSubmit={event => event.preventDefault()} style={{display: 'contents'}} >
                    <DialogContent sx={{flexDirection: 'column'}}>
                        <DialogContentText>
                            O sistema foi atualizado e sua senha precisa ser redefinida.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            helperText={passwordError}
                            error={!!passwordError || false}
                            margin="dense"
                            id="password"
                            label="Senha"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                        />
                        <TextField
                            autoFocus
                            helperText={confirmationError}
                            error={!!confirmationError || false}
                            margin="dense"
                            id="password_confirmation"
                            label="Confirme a senha"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(event) => setConfirmation(event.target.value)}
                            value={confirmation}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}