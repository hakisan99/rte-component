import React, { useMemo, useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import Element from './Element';
import Leaf from './Leaf';
import {StyledBody, StyledContainer} from './StyledComponents';
import TableOptions from './popupComponents/TableOptions';
import { tableCheck } from './editor-tools/tableUtil';
import useClickOutside from '../hooks/useClickOutside';
import withElement from '../utils/withElement';
import useMention from './mention/useMention';
import defaultValue from '../utils/defaultValue'
import mentionData from './mention/mentionData'
import ToolBar from './ToolBar';

const RichTextEditor = () => {
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
      console.log(domRange)
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
        <ToolBar/>
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

export default RichTextEditor;
