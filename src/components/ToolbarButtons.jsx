/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { ReactEditor, useSlate } from "slate-react";
//utils
import {changeIdentation, getCurrentColor, isAlignmentActive, isBlockActive, isMarkActive, toggleAlignment, toggleBlock, toggleMark, toggleTextStyling} from './editor-tools/slateUtil'
import {insertColumn, insertRow, removeColumn, removeRow, tableCheck, toggleTable} from './editor-tools/tableUtil'
//components
import { StyledButton } from "./StyledComponents"
import Icon from './Icon'
import TableMatrix from './popupComponents/TableMatrix'
//hook
import useClickOutside from '../hooks/useClickOutside'
import FontSizeOptions from './popupComponents/FontSizeOptions'
import ColorsPanel from './popupComponents/ColorsPanel'
import theme from '../utils/theme';
import { getFader } from '../utils/color';
import PopupWrapper from './popupComponents/PopupWrapper';


export const MarkButton = ({format, text, icon}) => {
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
export const BlockButton = ({format, text, icon}) => {
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
export const AlignButton = ({format, text, icon}) => {
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
export const IndenButton = ({format, text, icon}) => {
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
export const FontSizeButton = ({ text }) => {
  const [openFont, setOpenFont ] = useState(false);
  // const [previousSelection, setPreviousSelection] = useState(null);
  const editor = useSlate();
  const options = [
    { label: 'Large', value: '125%'},
    { label: 'Medium',value: '100%'},
    { label: 'Small', value: '75%'},
  ];
  const ref = useClickOutside(() => setOpenFont(false));
  const handleSelectFontSize = (value) => () => {
    toggleTextStyling(editor, 'fontSize', value);
  }
  return (
    <StyledButton
      ref={ref}
      title={text}
      onMouseDown={(e) => {
        e.preventDefault();
        setOpenFont(!openFont)
      }}
    > 
      <Icon icon={'font-size'} />
      <PopupWrapper isOpen={openFont} headline="Font Size">
        <FontSizeOptions options={options} handleSelectFontSize={handleSelectFontSize}/>
      </PopupWrapper>
    </StyledButton>
  )
}

export const TextColor = ({text = 'Text Color'}) => {

  const editor = useSlate();
  const [openColorPanel, setOpenColorPanel] = useState(false);
  const ref = useClickOutside(() => setOpenColorPanel(false));
  const handleSelectTextColor = (value) => () => {
    if (value === "remove") toggleTextStyling(editor, 'textColor', null)
    else toggleTextStyling(editor, 'textColor', value);
    setOpenColorPanel(false);
  }
  return (
    <StyledButton
      ref={ref}
      title={text}
      onMouseDown={(e) => {
        e.preventDefault()
        setOpenColorPanel(!openColorPanel)
      }}
    > 
      <Icon icon={'text-color'} color={getCurrentColor(editor, "color")} />
      <PopupWrapper isOpen={openColorPanel} headline="Color">
        <ColorsPanel current={getCurrentColor(editor, "color")} type="color" colors={Object.values(theme.light.color.text)} handleSelectColor={handleSelectTextColor}/>
        </PopupWrapper>
    </StyledButton>
  )
}

export const TextHighlight = ({text = 'Highlight text'}) => {
  const editor = useSlate();
  const [openColorPanel, setOpenColorPanel] = useState(false);
  const ref = useClickOutside(() => setOpenColorPanel(false));
  const handleSelectTextColor = (value) => () => {
    if (value === "remove") toggleTextStyling(editor, 'highlight', null)
    else toggleTextStyling(editor, 'highlight', getFader(value, 0.4));
    setOpenColorPanel(false);
  }
  return (
    <StyledButton
      ref={ref}
      title={text}
      onMouseDown={(e) => {
        e.preventDefault()
        setOpenColorPanel(!openColorPanel)
      }}
    > 
      <Icon icon={'highlight'} color={getCurrentColor(editor, "highlight")}/>
      <PopupWrapper isOpen={openColorPanel} headline="Highlight">
        <ColorsPanel current={getCurrentColor(editor, "highlight")} type="highlight" colors={Object.values(theme.light.color.text)} handleSelectColor={handleSelectTextColor}/>
      </PopupWrapper>
    </StyledButton>
  )
}

export const AddTableButton = ({text, icon}) => {
    const editor = useSlate()
    const [openTable, setOpenTable] = useState(false)
    const ref = useClickOutside(() => setOpenTable(false))
    const handleCreateTable = (e, col, row) => {
            e.preventDefault();
            toggleTable(
                editor,
                parseInt(row, 10),
                parseInt(col, 10)
            );
            setOpenTable(true)
        }
    return (
        <StyledButton ref={ref} title={text} disabled={!!tableCheck(editor) || !ReactEditor.isFocused(editor)}
            onMouseDown={(e) => {
                e.preventDefault()
                if (!openTable) setOpenTable(true)
                else setOpenTable(false)
            }}>
            <Icon icon={icon} isDisabled={!!tableCheck(editor) || !ReactEditor.isFocused(editor)}/>
            <PopupWrapper isOpen={openTable} headline="Table"><TableMatrix handleCreateTable={handleCreateTable} /></PopupWrapper>
        </StyledButton>
    )
}
export const TableButton = ({format, text}) => {
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
