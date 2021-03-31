/* eslint-disable react/prop-types */
import React from 'react'
import { useSlate } from "slate-react"
import { StyledButton } from "./StyledComponents"
import {isAlignmentActive, isBlockActive, isMarkActive, toggleAlignment, toggleBlock, toggleMark} from './editor-tools/slateUtil'

const MarkButton = ({format, text}) => {
    const editor = useSlate()
    return (
        <StyledButton active={isMarkActive(editor, format)} onMouseDown={e => {
            e.preventDefault()
            toggleMark(editor, format)
        }}>
            {text}
        </StyledButton>
    )
}
const BlockButton = ({format, text}) => {
    const editor = useSlate()
    return (
        <StyledButton active={isBlockActive(editor, format)} onMouseDown={e => {
            e.preventDefault()
            toggleBlock(editor, format)
        }}>
            {text}
        </StyledButton>
    )
}
const AlignButton = ({format, text}) => {
    const editor = useSlate()
    return (
        <StyledButton active={isAlignmentActive(editor, format)} onMouseDown={e => {
            e.preventDefault()
            toggleAlignment(editor, format)
        }}>
            {text}
        </StyledButton>
    )
}
export {MarkButton, BlockButton, AlignButton}