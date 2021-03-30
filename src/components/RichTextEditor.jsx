import React, { useMemo, useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import Element from './Element';
import Leaf from './Leaf';
import EditorTools from './editor-tools/EditorTools';

const editorTools = new EditorTools()

const RichTextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Line of text' }]
    }
  ]);
  const renderElement = useCallback((props) => {
    return <Element {...props} />
  }, []);
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, []);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newVal) => setValue(newVal)}
    >
      <button onMouseDown={() => editorTools.toggleMark(editor, 'bold')}>
        Bold
      </button>
      <button onMouseDown={() => editorTools.toggleMark(editor, 'italic')}>
        Italic
      </button>
      <button onMouseDown={() => editorTools.toggleMark(editor, 'underline')}>
        Underline
      </button>
      <button onMouseDown={() => editorTools.toggleMark(editor, 'sub')}>
        Sub
      </button>
      <button onMouseDown={() => editorTools.toggleMark(editor, 'sup')}>
        Sup
      </button>
      <button onMouseDown={() => editorTools.toggleBlock(editor, 'h1')}>
        H1
      </button>
      <button onMouseDown={() => editorTools.toggleBlock(editor, 'h2')}>
        H2
      </button>
      <button onMouseDown={() => editorTools.toggleBlock(editor, 'h3')}>
        H3
      </button>
      <button onMouseDown={() => editorTools.toggleBlock(editor, 'left')}>
        left
      </button>
      <button onMouseDown={() => editorTools.toggleBlock(editor, 'center')}>
        center
      </button>
      <button onMouseDown={() => editorTools.toggleBlock(editor, 'right')}>
        right
      </button>
      <button onMouseDown={() => editorTools.toggleBlock(editor, 'justify')}>
        justify
      </button>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
}


export default RichTextEditor