import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from "prop-types";
import { createEditor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import Element from './Element';
import Leaf from './Leaf';
import {StyledBody, StyledContainer, StyledToolbar, VerticalLine} from './StyledComponents';
import { AlignButton, BlockButton, IndenButton, MarkButton, AddTableButton, TableButton, FontSizeButton, TextColor, TextHighlight } from './ToolbarButtons';
import Toggle from './Toggle';
import TableOptions from './popupComponents/TableOptions';
import { tableCheck } from './editor-tools/tableUtil';
import useClickOutside from '../hooks/useClickOutside';
import withElement from '../utils/withElement';
import useMention from './mention/useMention';
import defaultValue from '../utils/defaultValue'
import mentionData from './mention/mentionData'

const RichTextEditor = (props) => {
  const editor = useMemo(() => withElement(withHistory(withReact(createEditor()))), []);
  const [value, setValue] = useState(defaultValue);

  const [keydownFunc, onChangeFunc, Mention] = useMention(editor, mentionData)

  const renderElement = useCallback((props) => {
    return <Element {...props} />;
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  //Table Options
  const [openTableOptions, setOpenTableOptions] = useState(false);
  const [tableOptionsPosition, setTableOptionsPosition] = useState({top: 0, left: 0});
  const ref = useClickOutside(() => setOpenTableOptions(false));
  const handleOpenTableOptions = () => {
    const isTable = tableCheck(editor);
    if (isTable) {
      const domRange = ReactEditor.toDOMRange(editor, editor.selection);
      const rect = domRange.getBoundingClientRect();
      const y = rect.top + window.pageYOffset + 32;
      const x = rect.left + window.pageXOffset + 32;
      setTableOptionsPosition({top: y, left: x})
      setOpenTableOptions(true);
    }
  }

  const onChange = (newVal) => {
    setValue(newVal)
    onChangeFunc()
  }
  return (
    <StyledContainer ref={ref}>
      <Slate
        editor={editor}
        value={value}
        onChange={onChange}
      >
        <StyledToolbar>
          <MarkButton format="bold" text="Bold" icon="bold" />
          <MarkButton format="italic" text="Italic" icon="italic" />
          <MarkButton format="underline" text="Underline" icon="underline" />
          <VerticalLine />
          <FontSizeButton text="Font Size" />
          <TextColor text="Text Color" />
          <TextHighlight text="Highlight text" />
          <VerticalLine />
          <BlockButton format="h1" text="Heading 1" icon="heading 1" />
          <BlockButton format="h2" text="Heading 2" icon="heading 2" />
          <BlockButton format="h3" text="Heading 3" icon="heading 3" />
          <VerticalLine />
          <IndenButton
            format="increase"
            text="Increase Indentation"
            icon="increase-indentation"
          />
          <IndenButton
            format="decrease"
            text="Decrease Indentation"
            icon="decrease-indentation"
          />
          <BlockButton format="ol" text="Ordered List" icon="ordered-list" />
          <BlockButton format="ul" text="Bullet List" icon="unordered-list" />
          <VerticalLine />
          <AlignButton format="left" text="Align Left" icon="align-left" />
          <AlignButton
            format="center"
            text="Align Center"
            icon="align-center"
          />
          <AlignButton format="right" text="Align Right" icon="align-right" />
          <AlignButton
            format="justify"
            text="Align Justify"
            icon="align-justify"
          />
          <VerticalLine />
          <AddTableButton text="Add Table" icon="table" />
          <TableButton format="insert-row" text="Insert Row" />
          <TableButton format="insert-column" text="Insert Column" />
          <TableButton format="remove-row" text="Remove Row" />
          <TableButton format="remove-column" text="Remove Column" />
          <VerticalLine />
          <Toggle
            value={props.isDark}
            onSelect={() => props.setIsDark(!props.isDark)}
          />
        </StyledToolbar>
        <StyledBody>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            autoFocus
            spellCheck={false}
            onContextMenu={(e) => {
              e.preventDefault();
              handleOpenTableOptions(e);
            }}
            onKeyDown={keydownFunc}
          />
          <Mention />
        </StyledBody>
        {openTableOptions && <TableOptions position={tableOptionsPosition} setOpenTableOptions={setOpenTableOptions} />}
      </Slate>
    </StyledContainer>
  );
};
RichTextEditor.propTypes = {
  isDark: PropTypes.bool,
  setIsDark: PropTypes.func
}

export default RichTextEditor;
