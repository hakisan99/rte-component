import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCell = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${props => props.theme.color.fill.primary};
  background: ${props => props.active ? props.theme.color.fill.primary : "transparent"};
  border-radius: 4px;
`
const StyledText = styled.div`
  color: ${props => props.theme.color.text.secondary};
  margin-top: 0.2rem;
`

const TableWrapper = styled.div`
  background: ${props => props.theme.color.background.secondary};
  border-radius: 4px;
`
const TableMatrix = ({ handleCreateTable }) => {
  const [coordinate, setCoordinate] = useState({ col: 0, row: 0 });
  const row = Array.from(Array(5))
    .map((e, i) => i + 1)
    .map((row) => (
      <div key={row} row={row} style={{ display: 'flex', gap: '0.1rem', paddingBottom: '0.1rem' }}>
        {Array.from(Array(6))
          .map((e, i) => i + 1)
          .map((col) => (
            <StyledCell
              onMouseOver={() => setCoordinate({ col, row })}
              onMouseDown={(e) => handleCreateTable(e, col, row)}
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
