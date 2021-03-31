import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCell = styled.button`
  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid ${props => props.theme.color.border.primary};
  background: ${props => props.active ? props.theme.color.fillprimary : props.theme.color.background.primary};

`
const StyledText = styled.div``
const TableWrapper = styled.div`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
`
const TableMatrix = ({ handleCreateTable }) => {
  const [coordinate, setCoordinate] = useState({ col: 0, row: 0 });
  const row = Array.from(Array(5))
    .map((e, i) => i + 1)
    .map((row) => (
      <div key={row} row={row} style={{ display: 'flex' }}>
        {Array.from(Array(6))
          .map((e, i) => i + 1)
          .map((col) => (
            <StyledCell
              onMouseOver={() => setCoordinate({ col, row })}
              onMouseDown={handleCreateTable({col, row})}
              key={col}
              col={col}
              active={col <= coordinate.col && row <= coordinate.row}
            />
          ))}
      </div>
    ));
  return (
    <TableWrapper>
      {row}
      <StyledText>Insert {coordinate.col} x {coordinate.row} table</StyledText>
    </TableWrapper>
  );
};

TableMatrix.propTypes = {
  handleCreateTable: PropTypes.func
}

export default TableMatrix;
