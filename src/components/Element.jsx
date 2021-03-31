import React from 'react';
import PropTypes from 'prop-types';

// Element Render
const Element = (props) => {
  const { attributes, element, children } = props;
  switch (element.type) {
    case 'h1':
      return <h1 {...attributes} style={{textAlign: element.alignment}}>{children}</h1>;
    case 'h2':
      return <h2 {...attributes} style={{textAlign: element.alignment}}>{children}</h2>;
    case 'h3':
      return <h3 {...attributes} style={{textAlign: element.alignment}}>{children}</h3>;
    case 'table':
      return (
        <table style={{ border: '1px red solid', borderCollapse: 'collapse' }} align='center'>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case 'table-row':
      return <tr {...attributes}>{children}</tr>;
    case 'table-cell':
      return <td style={{border: '1px red solid', width: '64px', height: '40px'}} {...attributes}>{children}</td>
    // case 'left':
    //   return <p {...attributes} style={{textAlign: 'left'}}>{children}</p>
    // case 'right':
    //   return <p {...attributes} style={{textAlign: 'right'}}>{children}</p>
    // case 'center':
    //   return <p {...attributes} style={{textAlign: 'center'}}>{children}</p>
    // case 'justify':
    //   return <p {...attributes} style={{textAlign: 'justify'}}>{children}</p>
    default:
      return <p style={{textAlign: element.alignment}} {...attributes}>{children}</p>
  }
};

Element.propTypes = {
  element: PropTypes.object,
  children: PropTypes.any,
  attributes: PropTypes.any
}

export default Element;
