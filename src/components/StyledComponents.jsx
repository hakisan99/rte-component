import styled from 'styled-components'

export const StyledToolbar = styled.div`
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem;
  border-bottom: 1px solid ${props => props.theme.color.border.primary};
`
export const StyledButton = styled.button`
  border: none;
  padding: 0.2rem;
  background: transparent;
  color: ${props => props.theme.color.text.secondary};
`
export const StyledBody = styled.div`
  padding: 0.4rem;
  color: ${props => props.theme.color.text.primary};
`
export const StyledContainer = styled.div`
  border: 1px solid ${props => props.theme.color.border.primary};
`