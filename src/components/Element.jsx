import React from 'react';

// Element Render
const Element = (props) => {
  const { attributes, element, children } = props;
  switch (element.type) {
    case 'h1':
      return <h1 {...attributes}>{children}</h1>;
    case 'h2':
      return <h2 {...attributes}>{children}</h2>;
    case 'h3':
      return <h3 {...attributes}>{children}</h3>;
    case 'table':
      return (
        <table style={{border: '1px #000 solid', borderCollapse: 'collapse'}}>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case 'table-row':
      return <tr {...attributes}>{children}</tr>;
    case 'table-cell':
      return <td style={{border: '1px #000 solid'}} {...attributes}>{children}</td>
    case 'left':
      return <p {...attributes} style={{textAlign: 'left'}}>{children}</p>
    case 'right':
      return <p {...attributes} style={{textAlign: 'right'}}>{children}</p>
    case 'center':
      return <p {...attributes} style={{textAlign: 'center'}}>{children}</p>
    case 'justify':
      return <p {...attributes} style={{textAlign: 'justify'}}>{children}</p>
    default:
      return <DefaultElement {...props} />;
  }
};

const DefaultElement = (props) => {
  return <p style={{textAlign: 'left'}} {...props.attributes}>{props.children}</p>;
};

export default Element;
