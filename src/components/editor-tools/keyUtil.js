import {onTableTab, tableCheck} from './tableUtil'
import isHotKey from 'is-hotkey'
import { toggleMark, changeIndentation, escapeBullet, onBulletTab } from './slateUtil'
//mod is ctrl in windows and cmd on mac
const isTab = isHotKey('tab')
const isBold = isHotKey('mod+b')
const isItalic = isHotKey('mod+i')
const isUnderline = isHotKey('mod+u')
const increaseIndentation = isHotKey('mod+]')
const decreaseIndentation = isHotKey('mod+[')
const isEnter = isHotKey('enter')
export const handleKey = (editor, e) => {
    if (isTab(e)) {
        e.preventDefault()
        if(tableCheck(editor))
            onTableTab(editor)
        onBulletTab(editor)
    } else if (isBold(e)) {
        e.preventDefault()
        toggleMark(editor, 'bold')
    } else if (isItalic(e)) {
        e.preventDefault()
        toggleMark(editor, 'italic')
    } else if (isUnderline(e)) {
        e.preventDefault()
        toggleMark(editor, 'underline')
    } else if (increaseIndentation(e)) {
        e.preventDefault()
        changeIndentation(editor, 'increase')
    } else if (decreaseIndentation(e)) {
        e.preventDefault()
        changeIndentation(editor, 'decrease')
    } else if (isEnter(e)) {
        escapeBullet(e, editor)
    }
}

