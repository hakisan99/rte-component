import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FontSizeOptionsWrapper = styled.ul`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.color.background.secondary};
  border: 1px solid ${(props) => props.theme.color.border.primary};
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.shadow};
  box-sizing: border-box;
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