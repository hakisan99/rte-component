import { Transforms, Text, Editor } from 'slate';

class EditorTools {
  markCheck(editor, mark) {
    const [match] = Editor.nodes(editor, { match: (n) => n[mark] });
    // !!undefined => false
    return !!match;
  }

  blockCheck(editor, type) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === type,
    });
    return !!match;
  }
  alignCheck(editor, alignment) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.alignment === alignment,
    });
    return !!match;
  }

  toggleBlock(e, editor, type) {
    e.preventDefault();
    const isActive = this.blockCheck(editor, type);
    Transforms.setNodes(
      editor,
      { type: isActive ? 'p' : type },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  }
  toggleTable(editor, row, column) {
    const rowArr = Array.apply(null, Array(row));
    const colArr = Array.apply(null, Array(column));
    // Create table children --> tr and td
    const rowEl = rowArr.map(() => {
      return {
        type: 'table-row',
        children: colArr.map(() => {
          return {
            type: 'table-cell',
            children: [{
              type: 'p',
              alignment: 'left',
              children: [{ text: 'Start using it right now' }],
            }],
          };
        }),
      };
    });
    console.log(rowEl);
    Transforms.insertNodes(
      editor,
      [
        {
          type: 'table',
          children: rowEl,
        },
        { type: 'p', children: [{ text: '' }] },
      ],
      { match: (n) => Editor.isBlock(editor, n) }
    );
  }
  toggleAlignment(e, editor, alignment) {
    e.preventDefault();
    
    //get the block type of the current block
    const [match] = Editor.nodes(editor, {
      match: (n) => Editor.isBlock(editor, n),
    });
    Transforms.setNodes(
      editor,
      { type: match[0].type, alignment: alignment },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  }
  toggleMark(e, editor, mark) {
    e.preventDefault();
    const isActive = this.markCheck(editor, mark);
    Transforms.setNodes(
      editor,
      { [mark]: isActive ? null : true },
      { match: (n) => Text.isText(n), split: 'true' }
    );
  }
}

export default EditorTools