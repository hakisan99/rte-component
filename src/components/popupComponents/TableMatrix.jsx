import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

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
const aniIn = keyframes`
  0% {transform: translateX(-50%) scaleY(0); transform-origin: 50% 0%; opacity: 0}
  100% {transform: translateX(-50%) scaleY(1); transform-origin: 50% 0%; opacity: 1}
`
const aniOut = keyframes`
  100% {transform: translateX(-50%) scaleY(0); transform-origin: 50% 0%; opacity: 0}
`
const TableWrapper = styled.div`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  animation: ${props => props.isOut ? aniOut : aniIn} 0.2s ease-in 0s 1 forwards normal;
  background: ${props => props.theme.color.background.secondary};
  padding: 0.4rem;
  border: 1px solid ${props => props.theme.color.border.primary};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadow};
`
const TableMatrix = ({ handleCreateTable, isOut }) => {
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
    <TableWrapper isOut={isOut}>
      {row}
      <StyledText>Insert {coordinate.col} x {coordinate.row} table</StyledText>
    </TableWrapper>
  );
};

TableMatrix.propTypes = {
  handleCreateTable: PropTypes.func,
  isOut: PropTypes.bool
}

export default TableMatrix;
