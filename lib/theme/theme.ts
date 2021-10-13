import { createTheme } from "@mui/material";
import { purple, grey } from "@mui/material/colors";
import { ptBR } from '@mui/material/locale'

const themeBuilder = (mode: 'light' | 'dark' = 'light') => createTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: grey[500] } ,
    mode
  }
}, ptBR)

export default themeBuilder