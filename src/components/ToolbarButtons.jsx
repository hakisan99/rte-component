/* eslint-disable react/prop-types */
import React from 'react'
import { useSlate } from "slate-react"
import { StyledButton } from "./StyledComponents"
import {changeIdentation, isAlignmentActive, isBlockActive, isMarkActive, toggleAlignment, toggleBlock, toggleMark} from './editor-tools/slateUtil'
import Icon from './Icon'

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
export {MarkButton, BlockButton, AlignButton, IndenButton}