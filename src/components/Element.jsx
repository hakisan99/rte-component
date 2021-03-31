import React from 'react';
import PropTypes from 'prop-types';
import { H4, H5, H3, P, StyledTable } from './StyledComponents';
import { OL, UL } from './Typography';
// Element Render
const Element = (props) => {
  const { attributes, element, children } = props;
  switch (element.type) {
    case 'h1':
      return <H3 {...attributes} textAlign={element.alignment} indentation={element.indentation}>{children}</H3>;
    case 'h2':
      return <H4 {...attributes} textAlign={element.alignment} indentation={element.indentation}>{children}</H4>;
    case 'h3':
      return <H5 {...attributes} textAlign={element.alignment} indentation={element.indentation}>{children}</H5>;
    case 'li':
      return <li {...attributes}>{children}</li>
    case 'ul':
      return <UL {...attributes}>{children}</UL>
    case 'ol':
      return <OL {...attributes}>{children}</OL>
    case 'table':
      return (
        <StyledTable>
          <tbody {...attributes}>{children}</tbody>
        </StyledTable>
      );
    case 'table-row':
      return <tr {...attributes}>{children}</tr>;
    case 'table-cell':
      return <td style={{border: '1px red solid', width: '64px', height: '40px'}} {...attributes}>{children}</td>
    default:
      return <P textAlign={element.alignment} indentation={element.indentation} {...attributes}>{children}</P>
  }
};

Element.propTypes = {
  element: PropTypes.object,
  children: PropTypes.any,
  attributes: PropTypes.any
}

export default Element;
