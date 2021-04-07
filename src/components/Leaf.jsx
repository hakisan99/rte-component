import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getFader } from '../utils/color';

const StyledSpan = styled.span`
  font-size: ${props => props.fontSize};
  color: ${props => props.theme.color.text[props.color] || props.theme.color.text.primary};
  background: ${props => props.background ? getFader(props.theme.color.text[props.background], 0.4) : 'transparent'};
`

const Leaf = (props) => {
  let { attributes, children, leaf } = props;
  attributes.tabIndex = 0;
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <i>{children}</i>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.sub) {
    children = <sub>{children}</sub>
  }
  if (leaf.sup) {
    children = <sup>{children}</sup>
  }
  return <StyledSpan fontSize={leaf.fontSize} color={leaf.textColor} background={leaf.highlight} {...attributes}>{children}</StyledSpan>
}

Leaf.propTypes = {
  leaf: PropTypes.object,
  children: PropTypes.any,
  attributes: PropTypes.any
}

export default Leaf;