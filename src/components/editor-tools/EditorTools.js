import { Transforms, Text, Editor } from 'slate';

class EditorTools {
  markCheck(editor, mark) {
      const [match] = Editor.nodes(editor, {match: n => n[mark]});
    // !!undefined => false
    return !!match
  }

  blockCheck(editor, type) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === type
    });
    return !!match
  }
  alignCheck(editor, alignment) {
    const [match] = Editor.nodes(editor, {
      match: n => n.alignment === alignment
    });
    return !!match
  }
  toggleBlock(e, editor, type) {
    e.preventDefault()
    const isActive = this.blockCheck(editor, type);
    Transforms.setNodes(
      editor,
      { type: isActive ? 'p' : type},
      { match: n => Editor.isBlock(editor, n)}
    );
  }
  toggleAlignment(e, editor, alignment) {
    e.preventDefault()

    //get current block type
    const [match] = Editor.nodes(editor, {
      match: n => Editor.isBlock(editor, n)
    });

    Transforms.setNodes(
      editor,
      { type: match[0].type, alignment: alignment},
      { match: n => Editor.isBlock(editor, n)}
    )
  }
  toggleMark(e, editor, mark) {
    e.preventDefault()
    const isActive = this.markCheck(editor, mark);
    Transforms.setNodes(
      editor,
      { [mark]: isActive ? null : true},
      { match: n => Text.isText(n), split: 'true'}
    )
  }
}

export default EditorTools