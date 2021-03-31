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
  VerticalLine,
} from './StyledComponents';
import { AlignButton, BlockButton, IndenButton, MarkButton } from './ToolbarButtons';
import TableMatrix from './TableMatrix';

const editorTools = new EditorTools();

const RichTextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [openTable, setOpenTable] = useState(false);
  // Handle creating table with coordinate from TableMatrix comp
  const handleCreateTable = (coordinate) => (e) => {
    e.preventDefault();
    editorTools.toggleTable(
      editor,
      parseInt(coordinate.row, 10),
      parseInt(coordinate.col, 10)
    );
    setOpenTable(false);
  }
  const [value, setValue] = useState([
    {
      type: 'h1',
      children: [{text: 'TTG Rich Text Editor using Slate.js'}]
    },
    {
      type: 'p',
      alignment: 'left',
      children: [{ text: 'Start using it right now' }],
    }
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
            <MarkButton  format="bold" text="Bold" icon="bold"/>
            <MarkButton  format="italic" text="Italic" icon="italic"/>
            <MarkButton  format="underline" text="Underline" icon="underline"/>
            <VerticalLine/>
            <BlockButton format="h1" text="Heading 1" icon="heading 1"/>
            <BlockButton format="h2" text="Heading 2" icon="heading 2"/>
            <BlockButton format="h3" text="Heading 3" icon="heading 3"/>
            <VerticalLine/>
            <IndenButton format="increase" text="Increase Indentation" icon="increase-indentation"/>
            <IndenButton format="decrease" text="Decrease Indentation" icon="decrease-indentation"/>
            <BlockButton format="ol" text="Ordered List" icon="ordered-list"/>
            <BlockButton format="ul" text="Bullet List" icon="unordered-list"/>
            <VerticalLine/>
            <AlignButton format="left" text="Left" icon="align-left"/>
            <AlignButton format="center" text="Center" icon="align-center"/>
            <AlignButton format="right" text="Right" icon="align-right"/>
            <AlignButton format="justify" text="Justify" icon="align-justify"/>
            <VerticalLine/>
          <StyledButton
            onMouseDown={() => {
             setOpenTable(!openTable);
            }}
          >
            Table
            { openTable && <TableMatrix handleCreateTable={handleCreateTable} />}
          </StyledButton>
          <StyledButton
            onMouseDown={(e) => {
              editorTools.insertRow(
                e,
                editor,
              );
            }}
          >
            Insert Row
          </StyledButton>
          <StyledButton
            onMouseDown={(e) => {
              editorTools.insertColumn(
                e,
                editor,
              );
            }}
          >
            Insert Column
          </StyledButton>
        </StyledToolbar>
        <StyledBody>
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} autoFocus spellCheck={false}/>
        </StyledBody>
      </Slate>
    </StyledContainer>
  );
};

export default RichTextEditor;
