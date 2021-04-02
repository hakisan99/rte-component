import React from 'react'
import RichTextEditor from './components/RichTextEditor'
import styled, { ThemeProvider } from 'styled-components'
import theme from './utils/theme'
import ThemeContext from './components/ThemeContext'

const StyledApp = styled.div`
  background: ${props => props.theme.color.background.primary};
  height: 100vh;
  overflow: hidden;
  padding: 1rem;
  transition: background 0.25s ease-out;
`

const Container = () => {
  const themeContext = ThemeContext.useContainer()
  
  return (
    <ThemeProvider theme={themeContext.isDark ? theme.dark : theme.light}>
        <StyledApp>
          <RichTextEditor/>
        </StyledApp>
    </ThemeProvider>
  )
}

function App() {
  return (
    <ThemeContext.Provider>
      <Container/>
    </ThemeContext.Provider>
  );
}

export default App;
