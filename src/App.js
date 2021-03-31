import React, { useState } from 'react'
import RichTextEditor from './components/RichTextEditor'
import styled, { ThemeProvider } from 'styled-components'
import theme from './utils/theme'
const StyledApp = styled.div`
  background: ${props => props.theme.color.background.primary};
  height: 100vh;
  overflow: hidden;
  padding: 1rem;
  transition: background 0.25s ease-out;
`

function App() {
  const [isDark, setIsDark] = useState(true)
  return (
    <ThemeProvider theme={isDark ? theme.dark : theme.light}>
      <StyledApp>
        <RichTextEditor setIsDark={setIsDark} isDark={isDark}/>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
