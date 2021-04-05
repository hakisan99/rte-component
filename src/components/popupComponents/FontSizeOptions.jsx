import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FontSizeOptionsWrapper = styled.ul`
  background: ${(props) => props.theme.color.background.secondary};
  list-style-type: none;
`

const FontSize = styled.li`
  color: ${(props) => props.theme.color.text.primary};
  padding: 0.4rem 0.6rem;
  &:hover {
    color: ${props => props.theme.color.fill.info};
    background: ${props => props.theme.color.background.secondary};
  }
`

const FontSizeOptions = ({options, handleSelectFontSize}) => {
  return (
    <FontSizeOptionsWrapper>
      {
        options.map((option) => 
          <FontSize key={option.value} onMouseDown={handleSelectFontSize(option.value)}>{option.label}</FontSize>
        )
      }
    </FontSizeOptionsWrapper>
  )
}

FontSizeOptions.propTypes =  {
  options: PropTypes.arrayOf(PropTypes.shape({label: PropTypes.string,value: PropTypes.string})),
  handleSelectFontSize: PropTypes.func,
}

export default FontSizeOptions