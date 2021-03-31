import { Transforms, Text, Editor } from 'slate';

class EditorTools {
  markCheck(editor, mark) {
    // const [match] = Editor.nodes(editor,{
    //   match: n => {
    //     switch (mark) {
    //       case 'bold':
    //         return n.bold === true;
    //       case 'italic':
    //         return n.italic === true;
    //       case 'underline':
    //         return n.underline === true;
    //       case 'sub':
    //         return n.sub === true;
    //       case 'sup':
    //         return n.sup === true;
    //       default:
    //         return false;
    //     }
    //   },
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
            children: [{ type: 'paragraph', children: [{text:''}] }],
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
  toggleAlignment(e, editor, alignment) {
    e.preventDefault();
    //const isActive = this.alignCheck(editor, alignment);
    const [match] = Editor.nodes(editor, {
      match: (n) => n.alignment === alignment,
    });
    Transforms.setNodes(
      editor,
      { alignment: match ? null : alignment },
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