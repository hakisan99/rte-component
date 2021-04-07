import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getDarker } from '../../utils/color';

const ColorsPanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;
  flex-wrap: wrap;
  width: 5rem;
  background: ${(props) => props.theme.color.background.secondary};
`

const ColorSquare = styled.div`
  flex: 1 0 30%;
  background-color: ${(props) => props.theme.color.text[props.color]};
  border: 7px solid ${props => props.active ? getDarker(props.theme.color.text[props.color], 50) : "transparent"};
  border-radius: 2px;
  //some kind of magic to make it "square"
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`
const RemoveButton = styled.div`
  border: 1px solid ${props => props.theme.color.border.primary};
  color: ${props => props.theme.color.fill.primary};
  background: transparent;
  margin-top: 0.4rem;
  display: block;
  padding: 0.2rem;
  width: 100%;
`
const ColorsPanel = ({current, colors, handleSelectColor}) => {
  return (
    <>
    <ColorsPanelWrapper>
      {
        colors.map(color => <ColorSquare active={current === color} key={color} onMouseDown={handleSelectColor(color)} color={color} />)
      }
    </ColorsPanelWrapper>
    <RemoveButton onMouseDown={handleSelectColor("remove")}>{"Remove"}</RemoveButton>
    </>
  )
}

export default ColorsPanel

ColorsPanel.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  handleSelectColor: PropTypes.func,
  type: PropTypes.string,
  current: PropTypes.string
}