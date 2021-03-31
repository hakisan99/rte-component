import { Transforms, Text, Editor } from 'slate';

class EditorTools {
  markCheck(editor, mark) {
    const [match] = Editor.nodes(editor, {
      match: (n) => {
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
    return !!match;
  }

  blockCheck(editor, type) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === type,
    });
    return !!match;
  }

  toggleBlock(editor, type) {
    const isActive = this.blockCheck(editor, type);
    const isTableCell = this.blockCheck(editor, 'table-cell');
    const node = isTableCell ? {
      type: 'table-cell', children: [{ type: isActive ? null : type}]
    } : {type: isActive ? null : type}
    Transforms.setNodes(
      editor,
      node,
      { match: (n) => Editor.isBlock(editor, n),  }
    );
  }

  toggleTable(editor, row, column) {
    const rowArr = Array.apply(null,Array(row));
    const colArr = Array.apply(null,Array(column));
    // Create table children --> tr and td
    const rowEl = rowArr.map(() => {
      return {
        type: 'table-row',
        children: colArr.map(() => {
          return {
            type: 'table-cell',
            children: [{ text: '' }],
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
        { type: 'paragraph', children: [{ text: '' }] },
      ],
      { match: (n) => Editor.isBlock(editor, n) }
    );
  }

  toggleMark(editor, mark) {
    const isActive = this.markCheck(editor, mark);
    Transforms.setNodes(
      editor,
      { [mark]: isActive ? null : true },
      { match: (n) => Text.isText(n), split: 'true' }
    );
  }
}

export default EditorTools