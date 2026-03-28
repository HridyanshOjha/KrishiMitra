import { createContext, useContext } from 'react'

export const DarkModeContext = createContext({ dark: false, toggleDark: () => {} })

export function useDarkMode() {
  return useContext(DarkModeContext)
}
