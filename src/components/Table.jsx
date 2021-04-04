/* eslint-disable no-unused-vars */
import React, { useState, forwardRef, useEffect } from 'react';
import { ReactEditor, useSlate} from 'slate-react';
import styled from 'styled-components';
import TableOptions from './popupComponents/TableOptions';
import { tableCheck } from './editor-tools/tableUtil'

//Table Options

const TableWrapper = styled.table`
  border-collapse: collapse;
  margin: 0.5rem 0;
`;
// eslint-disable-next-line react/prop-types
const Table = forwardRef(({attributes, children}, ref) => {
  const editor = useSlate();
  const [openTableOptions, setOpenTableOptions] = useState(false);
  const [tableOptionsPosition, setTableOptionsPosition] = useState({
    top: 0,
    left: 0,
  });
  const handleOpenTableOptions = (e) => {
    e.preventDefault();
    const domRange = ReactEditor.toDOMRange(editor, editor.selection);
    console.log(domRange);
    const rect = domRange.getBoundingClientRect();
    const y = rect.top + window.pageYOffset + 32;
    const x = rect.left + window.pageXOffset + 48;
    setTableOptionsPosition({ top: y, left: x });
    setOpenTableOptions(true);
  };
  useEffect(() => {
    // Close when click outside of table;
    setOpenTableOptions(false);
  }, [editor.selection]);
  return (
    <>
    <TableWrapper onContextMenu={(e) => handleOpenTableOptions(e)} ref={ref} {...attributes}>{children}</TableWrapper>
    { (openTableOptions && tableCheck(editor)) ? <TableOptions position={tableOptionsPosition} setOpenTableOptions={setOpenTableOptions} /> : null}
    </>
  )
});

export default Table;