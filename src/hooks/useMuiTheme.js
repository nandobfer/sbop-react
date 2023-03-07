import { createTheme } from "@mui/material"

export const useMuiTheme = () => {
    const THEME = createTheme({
        typography: {
         "fontFamily": ["Montserrats"].join(','),
        //  "fontSize": 14,
        //  "fontWeightLight": 300,
        //  "fontWeightRegular": 400,
        //  "fontWeightMedium": 500
        }
    })
    
    return THEME
}