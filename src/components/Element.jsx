import React from 'react';
import PropTypes from 'prop-types';
import { H1, H2, H3, P } from './Typography'
// Element Render
const Element = (props) => {
  const { attributes, element, children } = props;
  switch (element.type) {
    case 'h1':
      return <H1 {...attributes} style={{textAlign: element.alignment}}>{children}</H1>;
    case 'h2':
      return <H2 {...attributes} style={{textAlign: element.alignment}}>{children}</H2>;
    case 'h3':
      return <H3 {...attributes} style={{textAlign: element.alignment}}>{children}</H3>;
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
    default:
      return <P style={{textAlign: element.alignment}} {...attributes}>{children}</P>
  }
};

Element.propTypes = {
  element: PropTypes.object,
  children: PropTypes.any,
  attributes: PropTypes.any
}

export default Element;
