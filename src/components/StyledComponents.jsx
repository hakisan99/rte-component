import styled from 'styled-components';

export const StyledToolbar = styled.div`
  display: flex;
  gap: 0.4rem;
  padding: 0.2rem 0.4rem;
  border-bottom: 1px solid ${props => props.theme.color.border.primary};
`
export const StyledButton = styled.button`
  position: relative;
  border: none;
  padding: 0.2rem;
  color: ${props => props.active ? props.theme.color.text.primary : props.theme.color.text.secondary};
  background: ${props => props.active ? props.theme.color.border.primary : props.theme.color.background.primary};
  border-bottom: ${props => props.active ? "1px solid " + props.theme.color.fill.primary : "none"};
  height: 1.5rem;
  cursor: pointer;
  transition: all 0.25s ease-out;
  outline: none;
  &:hover {
    color: ${props => props.theme.color.fill.info};
    background: ${props => props.theme.color.background.secondary};
  }
`
export const StyledBody = styled.div`
  padding: 0.4rem;
  color: ${props => props.theme.color.text.primary};
`
export const StyledContainer = styled.div`
  border: 1px solid ${props => props.theme.color.border.primary};
`
export const StyledTable = styled.table`
    border-collapse: collapse;
`
export const TableRow = styled.tr``
export const StyledTableCell = styled.td`
  min-width: 4rem;
  padding: 0.2rem;
  border: 1px solid ${(props) => props.theme.color.text.secondary};
  background-color: ${(props) => props.active ? props.theme.color.fill.secondary : props.theme.color.background.primary};
`
export const VerticalLine = styled.div`
  min-height: 100%;
  width: 1px;
  background: ${props => props.theme.color.border.primary};
`
export const MentionTag = styled.span`
  display: inline-block;
  color: ${props => props.theme.color.text.info};
`
export const InsertLinkModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  width: 160px;
  min-width: 160px;
  height: 144px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.background.secondary};
  color: ${props => props.theme.color.text.primary};
  box-shadow: ${(props) => props.theme.shadow};
`
export const StyledInputLabel = styled.div`
  text-align: left;
  color: ${props => props.theme.color.text.primary};
  font-weight: bold;
  padding: 0.5em 0.6em;
`
export const StyledInput = styled.input`
  width: 100%;
  min-height: 24px;
  border-radius: 4px;
` 

import {H1, H2, H3, H4, H5, H6, P, HL} from './Typography'

export {H1, H2, H3, H4, H5, H6, P, HL}