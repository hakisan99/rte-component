/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useSlate } from "slate-react";
import { Transforms, Range } from 'slate'; 
//utils
import {changeIdentation, isAlignmentActive, isBlockActive, isMarkActive, toggleAlignment, toggleBlock, toggleMark, toggleTextStyling} from './editor-tools/slateUtil'
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
    {
      label: 'Large',
      value: '120%',
    },
    {
      label: 'Medium',
      value: '100%',
    },
    {
      label: 'Small',
      value: '80%',
    },
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
      {openFont && <FontSizeOptions options={options} handleSelectFontSize={handleSelectFontSize}/>}
    </StyledButton>
  )
}

export const TextColor = ({text = 'Text Color'}) => {
  const editor = useSlate();
  const [openColorPanel, setOpenColorPanel] = useState(false);
  const ref = useClickOutside(() => setOpenColorPanel(false));
  const handleSelectTextColor = (value) => () => {
    toggleTextStyling(editor, 'textColor', value);
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
      <Icon icon={'text-color'} />
      {openColorPanel && <ColorsPanel colors={Object.values(theme.light.color.text)} handleSelectColor={handleSelectTextColor}/>}
    </StyledButton>
  )
}

export const TextHighlight = ({text = 'Highlight text'}) => {
  const editor = useSlate();
  const [openColorPanel, setOpenColorPanel] = useState(false);
  const ref = useClickOutside(() => setOpenColorPanel(false));
  const handleSelectTextColor = (value) => () => {
    toggleTextStyling(editor, 'highlight', value);
    setOpenColorPanel(false);
    Transforms.select(editor, Range.end(editor.selection));
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
      <Icon icon={'highlight'} />
      {openColorPanel && <ColorsPanel colors={Object.values(theme.light.color.text).map(clr => getFader(clr, 0.4))} handleSelectColor={handleSelectTextColor}/>}
    </StyledButton>
  )
}

export const AddTableButton = ({text, icon}) => {
    const editor = useSlate()

    //const [disabled, setDisabled] = useState(tableCheck(editor))

    const [openTable, setOpenTable] = useState(false)
    const [isOut, setIsOut] = useState(false)
    const ref = useClickOutside(() => setIsOut(true))
    const handleCreateTable = (e, col, row) => {
            e.preventDefault();
            toggleTable(
                editor,
                parseInt(row, 10),
                parseInt(col, 10)
            );
            setIsOut(true)
        }
    useEffect(() => {
      if (isOut) setTimeout(() => setOpenTable(false), 200);
    });
    return (
        <StyledButton ref={ref} title={text} disabled={!!tableCheck(editor)}
            onMouseDown={(e) => {
                e.preventDefault()
                if (!openTable) {
                    setOpenTable(true)
                    setIsOut(false)
                } else {
                    setIsOut(true)
                }
            }}
        >
            <Icon icon = {icon} isDisabled={!!tableCheck(editor)}/>
            { openTable && <TableMatrix isOut={isOut} handleCreateTable={handleCreateTable} />}
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
