import { CircularProgress } from "@mui/material"

export const MuiLoading = ({ size, color }) => {
    
    return (
        <section className='MuiLoading-Component' >
            <CircularProgress size={size || '2vw'} color={color || 'secondary'} />
        </section>
    )
}