import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableWrapper } from './StyledComponents';
import { P } from './Typography';

const TableMatrix = ({ handleCreateTable }) => {
  const [coordinate, setCoordinate] = useState({ col: 0, row: 0 });
  const row = Array.from(Array(5))
    .map((e, i) => i + 1)
    .map((row) => (
      <div key={row} row={row} style={{ display: 'flex' }}>
        {Array.from(Array(6))
          .map((e, i) => i + 1)
          .map((col) => (
            <TableCell
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
      <P>
        Insert {coordinate.col}x{coordinate.row} table
      </P>
    </TableWrapper>
  );
};

TableMatrix.propTypes = {
  handleCreateTable: PropTypes.func
}

export default TableMatrix;
