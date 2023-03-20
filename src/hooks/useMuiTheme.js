import { createTheme } from "@mui/material"
import COLORS from '../sass/_colors.scss'

export const useMuiTheme = () => {
    const THEME = createTheme({
        typography: {
         "fontFamily": ["Montserrats"].join(','),
        //  "fontSize": 14,
        //  "fontWeightLight": 300,
        //  "fontWeightRegular": 400,
        //  "fontWeightMedium": 500
        },
        palette: {
            primary: {
                main: COLORS.primary
            },
            secondary: {
                main: '#ffffff'
            }
        }
    })
    
    return THEME
}