/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useSlate } from "slate-react"
//utils
import {changeIdentation, isAlignmentActive, isBlockActive, isMarkActive, toggleAlignment, toggleBlock, toggleMark} from './editor-tools/slateUtil'
import {insertColumn, insertRow, removeColumn, removeRow, toggleTable} from './editor-tools/tableUtil'
//components
import { StyledButton } from "./StyledComponents"
import Icon from './Icon'
import TableMatrix from './TableMatrix'
//hook
import useClickOutside from '../hooks/useClickOutside'

const MarkButton = ({format, text, icon}) => {
    const editor = useSlate()
    return (
        <StyledButton title={text} active={isMarkActive(editor, format)} onMouseDown={e => {
            e.preventDefault()
            toggleMark(editor, format)
        }}>
            <Icon icon={icon}/>
        </StyledButton>
    )
}
const BlockButton = ({format, text, icon}) => {
    const editor = useSlate()
    return (
        <StyledButton title={text} active={isBlockActive(editor, format)} onMouseDown={e => {
            e.preventDefault()
            toggleBlock(editor, format)
        }}>
            {icon ? <Icon icon = {icon}/> : text}
        </StyledButton>
    )
}
const AlignButton = ({format, text, icon}) => {
    const editor = useSlate()
    return (
        <StyledButton title={text}  active={isAlignmentActive(editor, format)} onMouseDown={e => {
            e.preventDefault()
            toggleAlignment(editor, format)
        }}>
            <Icon icon = {icon}/>
        </StyledButton>
    )
}
const IndenButton = ({format, text, icon}) => {
    const editor = useSlate()
    return (
        <StyledButton title={text}  active={isAlignmentActive(editor, format)} onMouseDown={e => {
            e.preventDefault()
            changeIdentation(editor, format)
        }}>
            <Icon icon = {icon}/>
        </StyledButton>
    )
}
const AddTableButton = ({text, icon}) => {
    
    const editor = useSlate()
    const [openTable, setOpenTable] = useState(false)
    const [isOut, setIsOut] = useState(false)
    const ref = useClickOutside(() => setIsOut(true))
    const handleCreateTable = (coordinate) => (e) => {
            e.preventDefault();
            toggleTable(
                editor,
                parseInt(coordinate.row, 10),
                parseInt(coordinate.col, 10)
            );
            setIsOut(true)
        }
    useEffect(() => {
        if(isOut)
            setTimeout(() => setOpenTable(false), 200)
    })
    return (
        <StyledButton ref={ref} title={text}
            onMouseDown={() => {
                if (!openTable) {
                    setOpenTable(true)
                    setIsOut(false)
                } else {
                    setIsOut(true)
                }
            }}
        >
            <Icon icon = {icon}/>
            { openTable && <TableMatrix isOut={isOut} handleCreateTable={handleCreateTable} />}
          </StyledButton>
    )
}
const TableButton = ({format, text}) => {
    const editor = useSlate()
    const func = 
        format === "insert-row" ? insertRow : 
        format === "remove-row" ? removeRow :
        format === "insert-column" ? insertColumn :
        format === "remove-column" ? removeColumn : 
        // Default function, never use anyway
        (e) => console.log(e)
    return (
        <StyledButton title={text} onMouseDown={e => {
            e.preventDefault()
            func(editor)
        }}>
            {text}
        </StyledButton>
    )
}
export {MarkButton, BlockButton, AlignButton, IndenButton, AddTableButton, TableButton}