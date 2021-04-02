import { useState } from "react"
// https://github.com/jamiebuilds/unstated-next
import { createContainer } from "unstated-next"

const useTheme = () => {
    const [isDark, setIsDark] = useState(true)
    const toggleTheme = () => setIsDark(!isDark)

    return {isDark, toggleTheme}
}

const ThemeContext =  createContainer(useTheme)

export default ThemeContext