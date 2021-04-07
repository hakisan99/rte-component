import { Transforms } from "slate";
import deserialize from "./deserialize";


const withHtml = (editor) => {
    const { insertData } = editor;
    editor.insertData = (data) => {
      const parser = new DOMParser();
      const htmlString = data.getData('text/html');
      if (htmlString) {
        const html = parser.parseFromString(htmlString, 'text/html');
        const colgroup = html.body.getElementsByTagName('COLGROUP');
        if (colgroup[0]) {
          colgroup[0].remove();
        }
        console.log(html.body);
        const fragment = deserialize(html.body);
        console.log(fragment);
        Transforms.insertNodes(editor, fragment);
        return;
      }
      insertData(data);
    } 
    return editor
}

export default withHtml