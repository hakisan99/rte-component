import React, {useState, useCallback, useEffect, useRef} from 'react'
import { Editor, Range, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { insertMention } from '../editor-tools/slateUtil'
import MentionPopup from './MentionPopup'

const useMention = (editor, data) => {
    const ref = useRef()
    const [target, setTarget] = useState()
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')
    const chars = search === '@' ? data : data.filter(c =>
        c.toLowerCase().indexOf(search.toLowerCase()) !== -1
      ).slice(0, 5)

    const onMouseEnter = (i) => {
        setIndex(i)
    }
    const onClick = (i) => {
        Transforms.select(editor, target)
        insertMention(editor, chars[i])
        setTarget(null)
    }
    const keydownFunc = useCallback(
        event => {
          if (target) {
            switch (event.key) {
              case 'ArrowDown': {
                event.preventDefault()
                const prevIndex = index >= chars.length - 1 ? 0 : index + 1
                setIndex(prevIndex)
                break
              }

              case 'ArrowUp': {
                event.preventDefault()
                const nextIndex = index <= 0 ? chars.length - 1 : index - 1
                setIndex(nextIndex)
                break
              }
              case 'Tab':
              case 'Enter': {
                event.preventDefault()
                Transforms.select(editor, target)
                insertMention(editor, chars[index])
                setTarget(null)
                break
              }
              case 'Escape':
                event.preventDefault()
                setTarget(null)
                break
            }
          }
        },
        [index, search, target]
    )
    const onChangeFunc = () => {
        const { selection } = editor
            if (selection && Range.isCollapsed(selection)) {
                const [start] = Range.edges(selection)
                const wordBefore = Editor.before(editor, start, { unit: 'word' });
                const before = wordBefore && Editor.before(editor, wordBefore);
                const beforeRange = before && Editor.range(editor, before, start);
                const beforeText = beforeRange && Editor.string(editor, beforeRange)
                const beforeMatch = beforeText && beforeText.match(/^@(\w*)/)
                const after = Editor.after(editor, start)
                const afterRange = Editor.range(editor, start, after)
                const afterText = Editor.string(editor, afterRange)
                const afterMatch = afterText.match(/^(\s|$)/)

                if (beforeMatch && afterMatch) {
                    setTarget(beforeRange)
                    setSearch(beforeMatch[1]);
                    setIndex(0)
                    return
                }
            }
        setTarget(null)
    }
    useEffect(() => {
        if (target && chars.length > 0) {
          const el = ref.current
          const domRange = ReactEditor.toDOMRange(editor, target)
          const rect = domRange.getBoundingClientRect()
          el.style.top = `${rect.top + window.pageYOffset + 32}px`
          el.style.left = `${rect.left + window.pageXOffset}px`
        }
      }, [chars.length, editor, index, search, target])
    const Mention = () => <MentionPopup target={target} reff={ref} chars={chars} index={index} onMouseEnter={onMouseEnter} onClick={onClick}/>

    return [keydownFunc, onChangeFunc, Mention]
}

export default useMention