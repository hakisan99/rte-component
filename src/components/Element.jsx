import React from 'react';
import PropTypes from 'prop-types';
import { H4, H5, H3, P, TableRow, MentionTag, StyledTableCell } from './StyledComponents';
import { LI, OL, UL } from './Typography';
import Table from './Table';
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
      return <LI {...attributes}>{children}</LI>
    case 'ul':
      return <UL indentation={element.indentation} {...attributes}>{children}</UL>
    case 'ol':
      return <OL indentation={element.indentation} {...attributes}>{children}</OL>
    case 'table':
      return <Table attr={attributes}><tbody>{children}</tbody></Table>
    case 'table-row':
      return <TableRow {...attributes}>{children}</TableRow>;
    case 'table-cell':
      return <StyledTableCell colSpan={element.colspan} {...attributes}>{children}</StyledTableCell>
    case 'mention':
      return <MentionTag {...attributes}>{element.character}{children}</MentionTag>
    case 'link':
      return <a {...attributes} href={element.url}>{children}</a>
    default:
      return <P textAlign={element.alignment} indentation={element.indentation} {...attributes}>{children}</P>
      //return <P tabIndex={0} style={{textAlign: element.alignment}} {...attributes}>{children}</P>
  }
};

Element.propTypes = {
  element: PropTypes.object,
  children: PropTypes.any,
  attributes: PropTypes.any
}

export default Element;
