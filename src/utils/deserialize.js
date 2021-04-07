import { jsx } from 'slate-hyperscript';

const ELEMENT_TAGS = {
  A: (el) => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'h1' }),
  H2: () => ({ type: 'h2' }),
  H3: () => ({ type: 'h3' }),
  LI: () => ({ type: 'li' }),
  OL: () => ({ type: 'ol' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'ul' }),
  TABLE: () => ({ type: 'table' }),
  TR: () => ({ type: 'table-row' }),
  TD: (el) => ({ type: 'table-cell', colspan: el.getAttribute('colspan') }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

const deserialize = (el) => {
  if (el.nodeType === 3) {
    console.log(el);
    if (el.parentNode.nodeName === 'P') {
      if (el.parentNode.parentNode.nodeName === 'TD') {
        return el.textContent;
      }
    }
    if (el.textContent.match(/^[\s]*$/gm)) {
      return null
    }
    return el.textContent.replace(/\n/g, '');
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0];
  }
  const children = Array.from(parent.childNodes).map(deserialize).flat();

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx('element', attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx('text', attrs, child));
  }

  return children;
};

export default deserialize
