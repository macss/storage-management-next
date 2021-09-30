import themeBuilder from "lib/theme/theme";
import { createContext } from "react";

export default createContext({
  toggleTheme: () => {},
  theme: themeBuilder()
})
