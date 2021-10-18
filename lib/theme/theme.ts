import { createTheme } from "@mui/material";
import { purple, grey } from "@mui/material/colors";
import { ptBR } from '@mui/material/locale'

/**
 * Theme builder used for the app, generates both `light` and `dark` modes
 * 
 * @param mode Choose wheter the theme is `light` or `dark`, defaults to `light`
 * 
 * @returns App Theme
 */
const themeBuilder = (mode: 'light' | 'dark' = 'light') => createTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: grey[500] } ,
    mode
  }
}, ptBR)

export default themeBuilder