import {onTab} from './tableUtil'
import isHotKey from 'is-hotkey'
import { toggleMark } from './slateUtil'

const isTab = isHotKey('tab')
const isBold = isHotKey('mod+b')
const isItalic = isHotKey('mod+i')
const isUnderline = isHotKey('mod+u')

export const handleKey = (editor, e) => {
    if (isTab(e)) {
        e.preventDefault()
        onTab(editor)
    } else if (isBold(e)) {
        e.preventDefault()
        toggleMark(editor, 'bold')
    } else if (isItalic(e)) {
        e.preventDefault()
        toggleMark(editor, 'italic')
    } else if (isUnderline(e)) {
        e.preventDefault()
        toggleMark(editor, 'underline')
    }
}

