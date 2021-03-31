import React from 'react'
import RichTextEditor from './components/RichTextEditor'
import styled, { ThemeProvider } from 'styled-components'
import theme from './utils/theme'
const StyledApp = styled.div`
  background: ${props => props.theme.color.background.primary};
  height: 100vh;
  overflow: hidden;
  padding: 1rem;
`

function App() {
  return (
    <ThemeProvider theme={theme.dark}>
      <StyledApp>
        <RichTextEditor />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
