import { Editor, Transforms, Range, Path, Node } from "slate";
import { ReactEditor } from "slate-react";

export const toggleTable = (editor, row, column) => {
    if (tableCheck(editor)) {
      console.log("Cannot create table inside table")
      return
    }
    if (!ReactEditor.isFocused(editor)) {
      console.log("Cannot create table when not focused")
      return
    }

    let tableArr = []
    for (var i = 0; i < row; i++) {
      let col = []
      for (var j = 0; j < column; j++) {
        col.push({type: 'table-cell', children: [{type: 'p', children: [{text: ''}]}]})
      }
      tableArr.push({type: 'table-row', children: col})
    }
    //Get the point at the caret
    const start = Range.start(editor.selection)
    //get the next line path, which will be the table
    const newPath = [...Path.next(start.path.slice(0,1))]

    Transforms.insertNodes(
      editor,
      [
        { type: 'table', children: tableArr },
        { type: 'p', children: [{ text: '' }] },
      ],
      { match: (n) => Editor.isBlock(editor, n) }
    );

    // check if the path is valid, just to be sure
    if (Node.has(editor, newPath)) {
      const node = Editor.node(editor, newPath)

      if (node[0].type === 'table') {
          const firstCellPath = [...newPath, 0, 0, 0, 0]
          // put caret to the first cell of the table
          Transforms.select(editor, Editor.start(editor, firstCellPath))
      }
    }

}
export const tableCheck = (editor) => {
    if (editor.selection) {
      const node = Editor.node(editor, editor.selection, { depth: 1 });
      if (node[0].type === 'table' && Range.isCollapsed(editor.selection)) {
        return node;
      }
      return null;
    }
  }

export const insertRow = (editor, below = false) => {
    const node = tableCheck(editor);
    console.log(editor)
    if (node) {
      const currentNumCol = node[0].children[0].children.length;
      const colArr = Array.apply(null, Array(currentNumCol));
      let insertLocation = Editor.parent(editor, editor.selection, { depth: 3 })[1];
      if (below) {
        insertLocation[insertLocation.length -1] = insertLocation[insertLocation.length -1] + 1;
      }
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
        { at: insertLocation}
      );
    }
  }

export const insertColumn = (editor, right) => {
    const node = tableCheck(editor);
    if (node) {
      const currentNumRows = node[0].children.length;
      console.log(Editor.parent(editor, editor.selection, { depth: 4 })[1]);
      for (let i = 0; i < currentNumRows; i += 1) {
        let pos = Editor.parent(editor, editor.selection, { depth: 4 })[1];
        // Row pos
        pos[1] = i;
        // Column pos
        if (right) {
          pos[pos.length -1 ] = pos[pos.length -1] + 1;
        }
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
// Delete whole table if it has only one row, otherwise just delete the row at cursor
export const removeRow = (editor) => {
    const node = tableCheck(editor);
    if (node) {
      let pos;
      if (node[0].children.length === 1) {
        pos = Editor.parent(editor, editor.selection, { depth: 2 })[1];
        Transforms.removeNodes(editor, { at: pos });
      }
      if (node[0].children.length > 1) {
        Transforms.removeNodes(editor, {
          at: Editor.parent(editor, editor.selection, { depth: 3 })[1],
        });
      }
    }
  }
// Delete whole table if it has only one column, otherwise just delete the column at cursor
export const removeColumn = (editor) => {
    const node = tableCheck(editor);
    if (node) {
      let pos;
      if (node[0].children[0].children.length === 1) {
        pos = Editor.parent(editor, editor.selection, { depth: 2 })[1];
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
export const onTab = (editor) => {
    //if in a table
    if (tableCheck(editor)) {
        const { selection } = editor
        const [start] = Range.edges(selection)
        const newPath = [...Path.next(start.path.slice(0,3)), 0, 0]

        if (Node.has(editor, newPath))
            Transforms.select(editor, newPath)
        else {
            //in this place you need to go to next row
            const newRowPath = [...Path.next(newPath.slice(0,2)), 0, 0, 0]
            
            if (Node.has(editor, newRowPath))
                Transforms.select(editor, newRowPath)
            else {
                //in this place you jump out of table
                const nextPath = [...Path.next(newRowPath.slice(0, 1)), 0]
                Transforms.select(editor, nextPath)
            }
        }
    } 
    else {
        //need to check if next node is table
        const [start] = Range.edges(editor.selection)
        const newPath = [...Path.next(start.path.slice(0,1))]
        
        if (Node.has(editor, newPath)) {
            const node = Editor.node(editor, newPath)

            if (node[0].type === 'table') {
                const firstCellPath = [...newPath, 0, 0, 0, 0]
                Transforms.select(editor, firstCellPath)
            }
        }
    }
}

