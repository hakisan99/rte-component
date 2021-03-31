import { Editor, Transforms } from "slate";

export const toggleTable = (editor, row, column) => {
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
export const tableCheck = (editor) => {
    if (editor.selection) {
      const node = Editor.node(editor, editor.selection, { depth: 1 });
      if (node[0].type === 'table') {
        return node;
      }
      return null;
    }
  }

export const insertRow = (editor) => {
    const node = tableCheck(editor);
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

export const insertColumn = (editor) => {
    const node = tableCheck(editor);
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

export const removeRow = (editor) => {
    const node = tableCheck(editor);
    if (node) {
      Transforms.removeNodes(editor, {
        at: Editor.parent(editor, editor.selection, { depth: 3 })[1],
      });
    }
  }
  // Delete whole table if it has only one column, otherwise just delete the column at cursor
export const removeColumn = (editor) => {
    const node = tableCheck(editor);
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