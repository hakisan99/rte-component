import { Transforms } from 'slate';
import deserialize from './deserialize';

const withHtml = (editor) => {
  const { insertData } = editor;
  editor.insertData = (data) => {
    const parser = new DOMParser();
    const htmlString = data.getData('text/html');
    if (htmlString) {
      const html = parser.parseFromString(htmlString, 'text/html');
      // Only Excel have this COLGROUP element need to be removed, also td children is empty array if empty cell is copied, so im appending <p> to every td
      const colgroup = html.body.getElementsByTagName('COLGROUP');
      if (colgroup[0]) {
        colgroup[0].remove();
        const tds = html.body.getElementsByTagName('TD');
        for (const td of tds) {
          const p = document.createElement('p');
          p.innerHTML = td.innerHTML ? td.innerHTML : '&#65279';
          td.innerHTML = '';
          td.appendChild(p);
        }
      }
      const fragment = deserialize(html.body);
      console.log(fragment);
      Transforms.insertNodes(editor, fragment);
      return;
    }
    insertData(data);
  };
  return editor;
};

export default withHtml;
