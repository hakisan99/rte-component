import { useState } from "react"
import { createContainer } from "unstated-next"

const useTheme = (isDarkk = true) => {
    const [isDark, setIsDark] = useState(isDarkk)
    const toggleTheme = () => setIsDark(!isDark)

    return {isDark, toggleTheme}
}

const ThemeContext =  createContainer(useTheme)

export default ThemeContext