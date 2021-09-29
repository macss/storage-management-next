import { createTheme } from "@material-ui/core";
import { ptBR } from '@material-ui/core/locale'

const themeBuilder = (mode: 'light' | 'dark' = 'light') => createTheme({
  palette: {
    mode
  }
}, ptBR)

export default themeBuilder