import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';


const aniIn = keyframes`
  0% {transform: translateX(-50%) scaleY(0); opacity: 0}
  100% {transform: translateX(-50%) scaleY(1); opacity: 1}
`
const aniOut = keyframes`
  100% {transform: translateX(-50%) scaleY(0); opacity: 0}
`
const TableWrapper = styled.div`
  transform-origin: 50% 0%;
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  animation: ${props => props.isOut ? aniOut : aniIn} 0.2s ease-in 0s 1 forwards normal;
  background: ${props => props.theme.color.background.secondary};
  padding: 0.4rem;
  border: 1px solid ${props => props.theme.color.border.primary};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadow};
`
const StyledHeader = styled.div`
  margin: -0.4rem -0.4rem 0.4rem -0.4rem;
  padding: 0.2rem;
  background: ${props => props.theme.color.background.secondary};
  border-bottom: 1px solid ${props => props.theme.color.border.primary};
    
`
const PopupWrapper = ({ children, isOpen, headline }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) setTimeout(() => setOpen(false), 200) 
        else setOpen(true)
    });

    return (
        open ?
        <TableWrapper isOut={!isOpen}>
            <StyledHeader>{headline}</StyledHeader>
            {children}
        </TableWrapper>
        : null
        
    );
};

PopupWrapper.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.element,
  headline: PropTypes.string
}

export default PopupWrapper;
