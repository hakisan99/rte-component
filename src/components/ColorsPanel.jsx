import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ColorsPanelWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  width: 96px;
  padding: 0.2rem;
  background: ${(props) => props.theme.color.background.secondary};
  border: 1px solid ${(props) => props.theme.color.border.primary};
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.shadow};
  box-sizing: border-box;
`

const ColorSquare = styled.div`
  width: 16px;
  height: 16px;
  margin: 0.2rem;
  background-color: ${(props) => props.color};
`

const ColorsPanel = ({colors, handleSelectColor}) => {
  return (
    <ColorsPanelWrapper>
      {
        colors.map(color => <ColorSquare key={color} onMouseDown={handleSelectColor(color)} color={color} />)
      }
    </ColorsPanelWrapper>
  )
}

export default ColorsPanel

ColorsPanel.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  handleSelectColor: PropTypes.func
}