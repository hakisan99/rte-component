import isUrl from "is-url"
import { wrapLink } from "../components/editor-tools/slateUtil"

const withElement = editor => {
    const { isInline, isVoid, insertText, insertData } = editor
  
    editor.isInline = element => {
      return (
        element.type === 'mention' ? true :
        element.type === 'link' ? true : 
        isInline(element))
    }
  
    editor.isVoid = element => {
      return(
        element.type === 'mention' ? true : 
        isVoid(element))
    }

    editor.insertText = (text) => {
      if (text && isUrl(text))
        wrapLink(editor, text)
      else insertText(text)
    }

    editor.insertData = (data) => {
      const text = data.getData('text/plain')

      if (text && isUrl(text))
        wrapLink(editor, text)
      else insertData(data)
    }
    
    

    return editor
}
export default withElement