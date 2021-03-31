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
  color: ${props => props.active ? props.theme.color.text.primary : props.theme.color.text.secondary};
  background: ${props => props.active ? props.theme.color.background.secondary : props.theme.color.background.primary};
  border-bottom: ${props => props.active ? "1px solid " + props.theme.color.fill.primary : "none"};
  height: 1.5rem;
  cursor: pointer;
`
export const StyledBody = styled.div`
  padding: 0.4rem;
  color: ${props => props.theme.color.text.primary};
`
export const StyledContainer = styled.div`
  border: 1px solid ${props => props.theme.color.border.primary};
`
export const StyledTable = styled.table`
    border: '1px red solid'; 
    border-collapse: 'collapse'; 
    width:"100%";
`
export const VerticalLine = styled.div`
  min-height: 100%;
  width: 1px;
  background: ${props => props.theme.color.border.primary};
`
import {H1, H2, H3, H4, H5, H6, P, HL} from './Typography'

export {H1, H2, H3, H4, H5, H6, P, HL}