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
                // Lam sao de biet duoc trong clipboard la copy tu excel ra ???
                // onPaste={(e) => {
                //   e.preventDefault()
                //   var clipText = e.clipboardData.getData('Text');
                //   console.log(e.clipboardData.types)
                //   console.log(ClipboardEvent.clipboardData)
                //   clipText = clipText.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/mg, function (match, p1) {
                //     // This function runs for each cell with multi lined text.
                //     return p1
                //         // Replace any double double-quotes with a single
                //         // double-quote
                //         .replace(/""/g, '"')
                //         // Replace all new lines with spaces.
                //         .replace(/\r\n|\n\r|\n|\r/g, '[NEWLINE]')
                //     ;
                //   })
                  
                //   let data = []
                //   clipText.split('\n').forEach(line => {
                //     if(line) {
                //       let row = []
                //       line.split('\t').forEach(cell => {
                //         row.push(cell.replace("[NEWLINE]", "\n"))
                //       })
                //       data.push(row)
                //     }
                //   })
                //   console.log(data)
                // }}
              />
              <Mention />
            </StyledBody>
          </Slate>
        </StyledContainer>
  );
};

export default RichTextEditor;
