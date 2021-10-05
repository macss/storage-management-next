import { createTheme } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import { ptBR } from '@material-ui/core/locale'

const themeBuilder = (mode: 'light' | 'dark' = 'light') => createTheme({
  palette: {
    primary: { main: green[500] },
    secondary: { main: grey[500] } ,
    mode
  }
}, ptBR)

export default themeBuilder