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
  if (leaf.fontSize) {
    children = <span style={{fontSize: leaf.fontSize}}>{children}</span>
  }
  if (leaf.textColor) {
    children = <span style={{color: leaf.textColor}}>{children}</span>
  }
  if (leaf.highlight) {
    children = <span style={{backgroundColor: leaf.highlight}}>{children}</span>
  }
  return <span {...attributes}>{children}</span>
}

Leaf.propTypes = {
  leaf: PropTypes.object,
  children: PropTypes.any,
  attributes: PropTypes.any
}

export default Leaf;