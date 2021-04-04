/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { Editable, Slate } from 'slate-react'
import styled from 'styled-components'
import Element from './Element'
import Leaf from './Leaf'
import { StyledBody } from './StyledComponents'
import { P } from './Typography'

const StyledReadOnly = styled.div`
    margin-top: 2rem;
    border: 1px solid ${props => props.theme.color.border.primary};
`
const StyledHeader = styled.div`
    padding: 0.4rem;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
`

const ReadOnly = ({editor, value}) => {

    const renderElement = useCallback((props) => <Element {...props} />, [])

    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

    return (
        <StyledReadOnly>
            <StyledHeader><P>Displayer</P></StyledHeader>
            <Slate editor={editor} value={value}>
                <StyledBody>
                    <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    spellCheck={false}
                    readOnly
                    />
                </StyledBody>
            </Slate>
        </StyledReadOnly>
    )
}

export default ReadOnly