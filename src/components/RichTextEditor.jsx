import React, { useMemo, useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import Element from './Element';
import Leaf from './Leaf';
import {StyledBody, StyledContainer} from './StyledComponents';
import withElement from '../utils/withElement';
import useMention from './mention/useMention';
import defaultValue from '../utils/defaultValue'
import mentionData from './mention/mentionData'
import ToolBar from './ToolBar';
import { handleKey } from './editor-tools/keyUtil';
import withHtml from '../utils/withHtml';

const RichTextEditor = () => {
  
  const editor = useMemo(() => withHtml(withElement(withHistory(withReact(createEditor())))), []);
  
  const [value, setValue] = useState(defaultValue);

  const [keydownFunc, onChangeFunc, Mention] = useMention(editor, mentionData)

  const renderElement = useCallback((props) => <Element {...props} />, [])

  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  const onChange = (newVal) => {
    setValue(newVal)
    onChangeFunc()
  }
  const handleKeyDown = (e) => {
    keydownFunc(e)
    handleKey(editor, e)
  }

  return (
        <StyledContainer >
          <Slate editor={editor} value={value} onChange={onChange}>
            <ToolBar/>
            <StyledBody>
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                autoFocus
                spellCheck={false}
                onKeyDown={handleKeyDown}
              />
              <Mention />
            </StyledBody>
          </Slate>
        </StyledContainer>
  );
};

export default RichTextEditor;
