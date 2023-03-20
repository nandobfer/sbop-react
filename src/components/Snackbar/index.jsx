import { Alert, Snackbar as MuiSnackbar } from "@mui/material"

export const Snackbar = ({ open, setOpen, vertical, horizontal, text, severity }) => {
    
    return (
        <MuiSnackbar open={open} autoHideDuration={3000} onClose={() => setOpen('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={() => setOpen('')} severity={severity || 'info'} sx={{ width: '100%' }}>
                {text}
            </Alert>
        </MuiSnackbar>
    )
}