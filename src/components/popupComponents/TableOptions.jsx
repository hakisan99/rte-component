import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSlate } from 'slate-react';
import {insertRow, insertColumn, removeRow, removeColumn} from '../editor-tools/tableUtil';


const TableOptionsWrapper = styled.ul`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.color.background.secondary};
  border: 1px solid ${(props) => props.theme.color.border.primary};
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.shadow};
  box-sizing: border-box;
  list-style-type: none;
`

const TableOption = styled.li`
  color: ${(props) => props.theme.color.text.primary};
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.color.fill.info};
    background: ${props => props.theme.color.background.secondary};
  }
`

const TableOptions = ({position, setOpenTableOptions}) => {
  const editor = useSlate();
  return (
    <TableOptionsWrapper style={{top: position.top + 'px', left: position.left + 'px'}}>
      <TableOption onMouseDown={() => {insertRow(editor); setOpenTableOptions(false)}}>Insert Row</TableOption>
      <TableOption onMouseDown={() => {insertColumn(editor); setOpenTableOptions(false)}}>Insert Column</TableOption>
      <TableOption onMouseDown={() => {removeRow(editor); setOpenTableOptions(false)}}>Remove Row</TableOption>
      <TableOption onMouseDown={() => {removeColumn(editor); setOpenTableOptions(false)}}>Remove Column</TableOption>
      <TableOption onMouseDown={() => setOpenTableOptions(false)}>Close</TableOption>
    </TableOptionsWrapper>
  )
};

TableOptions.propTypes = {
  position: PropTypes.shape({ top: PropTypes.number, left: PropTypes.number}),
  setOpenTableOptions: PropTypes.func
};

export default TableOptions;