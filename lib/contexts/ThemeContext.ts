import themeBuilder from '@theme/theme'
import { createContext } from 'react'

/**
 * Theme context, provides thr current theme and the theme toggler function
 * 
 * @param toggleTheme function used to toggle theme
 * @default '() => void'
 * 
 * @param theme the material theme
 * @default 'Light theme'
 */
export default createContext({
  toggleTheme: () => {},
  theme: themeBuilder()
})
