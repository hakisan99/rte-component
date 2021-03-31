import { Editor, Element, Transforms } from "slate"

const LIST_TYPES = ['ol', 'ul']

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}
const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}
const toggleAlignment = (editor, format) => {
    Transforms.setNodes(
      editor,
      { alignment: format },
      { match: (n) => Editor.isBlock(editor, n) }
    );
}
const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === format
    })

    return !!match
}
const isAlignmentActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && Element.isElement(n) && n.alignment === format
    })

    return !!match
}
const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: n =>
        LIST_TYPES.includes(
          !Editor.isEditor(n) && Element.isElement(n) && n.type
        ),
      split: true,
    })
    const newProperties = {
      type: isActive ? 'paragraph' : isList ? 'li' : format,
    }
    Transforms.setNodes(editor, newProperties)
  
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }
export {isMarkActive, toggleMark, isBlockActive, toggleBlock, toggleAlignment, isAlignmentActive}
