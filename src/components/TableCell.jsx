/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Path, Range, Transforms } from 'slate'
import {  useSlate } from 'slate-react'
import { StyledTableCell } from "./StyledComponents"

const TableCell = (props) => {
    const editor = useSlate()

    return (
        <StyledTableCell {...props.att} onClick={() => {
            const { selection } = editor
            const [start] = Range.edges(selection)
            console.log(start.path)
        }}>
            {props.children}
        </StyledTableCell>
    )
}

export default TableCell