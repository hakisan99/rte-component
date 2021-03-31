import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import Element from './Element';
import Leaf from './Leaf';
import EditorTools from './editor-tools/EditorTools';
import { StyledBody, StyledButton, StyledContainer, StyledToolbar} from './StyledComponents'
const toolBar = [
  {type: 'mark', value: 'bold', label: "Bold", svg: ""},
  {type: 'mark', value: 'italic', label: "Italic", svg: ""},
  {type: 'mark', value: 'underline', label: "Underline", svg: ""},
  {type: 'mark', value: 'sub', label: "Sub", svg: ""},
  {type: 'mark', value: 'sup', label: "Sup", svg: ""},
  {type: 'block', value: 'h1', label: "H1", svg: ""},
  {type: 'block', value: 'h2', label: "H2", svg: ""},
  {type: 'block', value: 'h3', label: "H3", svg: ""},
  {type: 'alignment', value: 'left', label: "Left", svg: ""},
  {type: 'alignment', value: 'center', label: "Center", svg: ""},
  {type: 'alignment', value: 'right', label: "Right", svg: ""},
  {type: 'alignment', value: 'justify', label: "Justify", svg: ""},
]

const editorTools = new EditorTools()

const RichTextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState([
    {
      type: 'h1',
      children: [{text: 'TTG Rich Text Editor using Slate.js'}]
    },
    {
      type: 'p',
      children: [{ text: 'Start using it right now...' }]
    }, 
  ]);
  useEffect(() => {
    console.log(editor.children)
  })
  const renderElement = useCallback((props) => {
    return <Element {...props} />
  }, []);
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, []);
  return (
    <StyledContainer>
      <Slate editor={editor} value={value} onChange={(newVal) => setValue(newVal)}>
        <StyledToolbar>
          {toolBar.filter(tool => tool.type === 'mark')
            .map(tool => 
              <StyledButton key={tool.value} onMouseDown={(e) => editorTools.toggleMark(e, editor, tool.value)}>{tool.label}</StyledButton>
            )
          }
          {toolBar.filter(tool => tool.type === 'block')
            .map(tool => 
              <StyledButton key={tool.value} onMouseDown={(e) => editorTools.toggleBlock(e, editor, tool.value)}>{tool.label}</StyledButton>
            )
          }
          {toolBar.filter(tool => tool.type === 'alignment')
            .map(tool => 
              <StyledButton key={tool.value} onMouseDown={(e) => editorTools.toggleAlignment(e, editor, tool.value)}>{tool.label}</StyledButton>
            )
          }
        </StyledToolbar>
        <StyledBody>
          <Editable renderElement={renderElement} renderLeaf={renderLeaf}/>
        </StyledBody>
      </Slate> 
    </StyledContainer>
  );
}


export default RichTextEditor