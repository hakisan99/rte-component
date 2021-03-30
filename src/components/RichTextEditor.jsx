import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Transforms, Text, Editor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

class EditorTools {
  markCheck(editor, mark) {
    const [match] = Editor.nodes(editor,{
      match: n => {
        switch (mark) {
          case 'bold':
            return n.bold === true;
          case 'italic':
            return n.italic === true;
          case 'underline':
            return n.underline === true;
          case 'sub':
            return n.sub === true;
          case 'sup':
            return n.sup === true;
          default:
            return false;
        }
      },
    });
    // !!undefined => false
    return !!match
  };

  blockCheck(editor, type) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === type
    });
    return !!match
  }

  toggleBlock(editor, type) {
    const isActive = this.blockCheck(editor, type);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : type},
      { match: n => Editor.isBlock(editor, n)}
    );
  };

  toggleMark(editor, mark) {
    const isActive = this.markCheck(editor, mark);
    Transforms.setNodes(
      editor,
      { [mark]: isActive ? null : true},
      { match: n => Text.isText(n), split: 'true'}
    )
  };
};

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
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
}


// Element Render

const Element = (props) => {
  const { attributes, element, children } = props;
  switch (element.type) {
    case 'h1':
      return <h1 {...attributes}>{children}</h1>
    default:
      return <DefaultElement {...props} />;
  }
}

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>
};

const Leaf = (props) => {
  let { attributes, children, leaf } = props;
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <i>{children}</i>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.sub) {
    children = <sub>{children}</sub>
  }
  if (leaf.sup) {
    children = <sup>{children}</sup>
  }
  return <span {...attributes}>{children}</span>
}

export default RichTextEditor