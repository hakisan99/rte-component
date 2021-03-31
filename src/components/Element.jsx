import React from 'react';
import PropTypes from 'prop-types';
import { H4, H2, H3, P, StyledTable } from './StyledComponents';
// Element Render
const Element = (props) => {
  const { attributes, element, children } = props;
  switch (element.type) {
    case 'h1':
      return <H2 {...attributes} style={{textAlign: element.alignment}}>{children}</H2>;
    case 'h2':
      return <H3 {...attributes} style={{textAlign: element.alignment}}>{children}</H3>;
    case 'h3':
      return <H4 {...attributes} style={{textAlign: element.alignment}}>{children}</H4>;
    case 'li':
      return <li {...attributes} >{children}</li>
    case 'ul':
      return <ul {...attributes}style={{marginLeft: "1rem"}}>{children}</ul>
    case 'ol':
      return <ol {...attributes}style={{marginLeft: "1rem"}}>{children}</ol>
    case 'table':
      return (
        <StyledTable>
          <tbody {...attributes}>{children}</tbody>
        </StyledTable>
      );
    case 'table-row':
      return <tr {...attributes}>{children}</tr>;
    case 'table-cell':
      return <td  style={{border: '1px red solid', width: '64px', height: '40px'}} {...attributes}>{children}</td>
    default:
      return <P tabIndex={0} style={{textAlign: element.alignment}} {...attributes}>{children}</P>
  }
};

Element.propTypes = {
  element: PropTypes.object,
  children: PropTypes.any,
  attributes: PropTypes.any
}

export default Element;
