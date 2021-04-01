import React from 'react';
import PropTypes from 'prop-types';

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
  return <span style={{fontSize: leaf.fontSize, color: leaf.textColor, backgroundColor: leaf.highlight}} {...attributes}>{children}</span>
}

Leaf.propTypes = {
  leaf: PropTypes.object,
  children: PropTypes.any,
  attributes: PropTypes.any
}

export default Leaf;