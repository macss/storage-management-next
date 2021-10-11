import { createTheme } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { ptBR } from '@mui/material/locale'

const themeBuilder = (mode: 'light' | 'dark' = 'light') => createTheme({
  palette: {
    primary: { main: green[500] },
    secondary: { main: grey[500] } ,
    mode
  }
}, ptBR)

export default themeBuilder