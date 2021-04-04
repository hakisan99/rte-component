/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import Portal from "./Portal"

const ani = keyframes`
  0% {transform: scaleY(0)}
  100% {transform: scaleY(1)}
`

export const StyledPopup = styled.div`
  top: -9999px;
  left: -9999px;
  position: absolute;
  z-index: 1;
  padding: 0.2rem 0;
  background: ${props => props.theme.color.background.secondary};
  border: 1px solid ${props => props.theme.color.border.primary};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadow};
  transform-origin: 50% 0%;
  ${props => props.runAni && css`
    animation: ${ani} 0.1s ease-out 0s 1 forwards normal;
  `}
  
`
export const StyledItem = styled.div`
  background: ${props => props.active ? props.theme.color.border.primary : props.theme.color.background.secondary};
  padding: 0.4rem;
  color: ${props => props.theme.color.text.primary};
  cursor: pointer;
`
// eslint-disable-next-line no-unused-vars
const MentionPopup =  ({target, reff, chars, index, onMouseEnter, onClick}) => {

    return (
      (chars.length > 0) ? (
        <Portal>
          <StyledPopup ref={reff}>
            {chars.map((char, i) => (
              <StyledItem key={char} active={i === index} onMouseEnter={() => onMouseEnter(i)} onMouseDown={(e) => {e.preventDefault();onClick(i)}}>
                {char}
              </StyledItem>
            ))}
          </StyledPopup>
        </Portal>
      ) : null
    )
}

export default MentionPopup