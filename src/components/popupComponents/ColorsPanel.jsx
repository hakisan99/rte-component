import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ColorsPanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;
  flex-wrap: wrap;
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  width: 96px;
  padding: 0.4rem;
  background: ${(props) => props.theme.color.background.secondary};
  border: 1px solid ${(props) => props.theme.color.border.primary};
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.shadow};

`

const ColorSquare = styled.div`
  flex: 1 0 30%;
  height: 1.4rem;

  background-color: ${(props) => props.color};
`

const ColorsPanel = ({colors, handleSelectColor}) => {
  return (
    <ColorsPanelWrapper>
      {
        colors.map(color => <ColorSquare key={color} onMouseDown={(e) => {
          e.preventDefault()
          handleSelectColor(color)
        }} color={color} />)
      }
    </ColorsPanelWrapper>
  )
}

export default ColorsPanel

ColorsPanel.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  handleSelectColor: PropTypes.func
}