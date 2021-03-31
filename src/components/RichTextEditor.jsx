import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import Element from './Element';
import Leaf from './Leaf';
import EditorTools from './editor-tools/EditorTools';
import {
  StyledBody,
  StyledButton,
  StyledContainer,
  StyledToolbar,
} from './StyledComponents';
import { AlignButton, BlockButton, MarkButton } from './ToolbarButtons';

const editorTools = new EditorTools();

const RichTextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState([
    {
      type: 'h1',
      children: [{text: 'TTG Rich Text Editor using Slate.js'}]
    },
    {
      type: 'p',
      alignment: 'left',
      children: [{ text: 'Start using it right now' }],
    },
  ]);
  useEffect(() => {
    console.log(editor.children)
  })
  const renderElement = useCallback((props) => {
    return <Element {...props} />;
  }, []);
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);
  return (
    <StyledContainer>
      <Slate
        editor={editor}
        value={value}
        onChange={(newVal) => setValue(newVal)}
      >
        <StyledToolbar>
            <MarkButton format="bold" text="Bold"/>
            <MarkButton format="italic" text="Italic"/>
            <MarkButton format="underline" text="Underline"/>
            <BlockButton format="h1" text="Heading 1"/>
            <BlockButton format="h2" text="Heading 2"/>
            <BlockButton format="h3" text="Heading 3"/>
            <BlockButton format="ol" text="Ordered List"/>
            <BlockButton format="ul" text="Bullet List"/>
            <AlignButton format="left" text="Left"/>
            <AlignButton format="center" text="Center"/>
            <AlignButton format="right" text="Right"/>
            <AlignButton format="justify" text="Justify"/>
          <StyledButton
            onMouseDown={() => {
              const row = window.prompt('Enter row:');
              const column = window.prompt('Enter column:');
              editorTools.toggleTable(
                editor,
                parseInt(row, 10),
                parseInt(column, 10)
              );
            }}
          >
            Table
          </StyledButton>

        </StyledToolbar>
        <StyledBody>
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </StyledBody>
      </Slate>
    </StyledContainer>
  );
};

export default RichTextEditor;
