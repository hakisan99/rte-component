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

  tableCheck(editor) {
    if (editor.selection) {
      const node = Editor.node(editor, editor.selection, { depth: 1 });
      if (node[0].type === 'table') {
        return node;
      }
      return null;
    }
  }

  insertRow(e, editor) {
    e.preventDefault();
    const node = this.tableCheck(editor);
    if (node) {
      const currentNumCol = node[0].children[0].children.length;
      const colArr = Array.apply(null, Array(currentNumCol));
      Transforms.insertNodes(
        editor,
        {
          type: 'table-row',
          children: colArr.map(() => {
            return {
              type: 'table-cell',
              children: [
                {
                  type: 'p',
                  children: [{ text: '' }],
                },
              ],
            };
          }),
        },
        { at: Editor.parent(editor, editor.selection, { depth: 3 })[1] }
      );
    }
  }

  insertColumn(e, editor) {
    e.preventDefault();
    const node = this.tableCheck(editor);
    if (node) {
      const currentNumRows = node[0].children.length;
      for (let i = 0; i < currentNumRows; i += 1) {
        let pos = Editor.parent(editor, editor.selection, { depth: 4 })[1];
        pos[1] = i;
        Transforms.insertNodes(
          editor,
          {
            type: 'table-cell',
            children: [
              {
                type: 'p',
                children: [{ text: '' }],
              },
            ],
          },
          { at: pos }
        );
      }
    }
  }

  removeRow(e, editor) {
    e.preventDefault();
    const node = this.tableCheck(editor);
    if (node) {
      Transforms.removeNodes(editor, {
        at: Editor.parent(editor, editor.selection, { depth: 3 })[1],
      });
    }
  }
  // Delete whole table if it has only one column, otherwise just delete the column at cursor
  removeColumn(e, editor) {
    e.preventDefault();
    const node = this.tableCheck(editor);
    if (node) {
      let pos;
      if (node[0].children[0].children.length === 1) {
        pos = Editor.parent(editor, editor.selection, { depth: 2 })[1];
        console.log(pos);
        Transforms.removeNodes(editor, { at: pos });
      }
      if (node[0].children[0].children.length > 1) {
        const currentNumRows = node[0].children.length;
        pos = Editor.parent(editor, editor.selection, { depth: 4 })[1];
        for (let i = 0; i < currentNumRows; i += 1) {
          pos[1] = i;
          Transforms.removeNodes(editor, { at: pos });
        }
      }
    }
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
            children: [
              {
                type: 'p',
                children: [{ text: '' }],
              },
            ],
          };
        }),
      };
    });
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
    // const [match] = Editor.nodes(editor, {
    //   match: (n) => n.alignment === alignment,
    // });
    console.log('Boom');
    Transforms.setNodes(
      editor,
      { alignment: alignment },
      { match: (n) => Editor.isBlock(editor, n) }
    );
    Transforms.setNodes();
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