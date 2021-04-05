import React from 'react'
import {StyledToolbar, VerticalLine} from './StyledComponents';
import ThemeContext from './ThemeContext';
import Toggle from './Toggle';
import { AlignButton, BlockButton, IndenButton, MarkButton, AddTableButton, FontSizeButton, TextColor, TextHighlight } from './ToolbarButtons';

const ToolBar = () => {
    let themeContext = ThemeContext.useContainer()
    return (
        <StyledToolbar>
            <MarkButton format="bold" text="Bold" icon="bold" />
            <MarkButton format="italic" text="Italic" icon="italic" />
            <MarkButton format="underline" text="Underline" icon="underline" />
            <VerticalLine />
            <FontSizeButton text="Font Size" />
            <TextColor text="Text Color" />
            <TextHighlight text="Highlight Text" />
            <VerticalLine />
            <BlockButton format="h1" text="Heading 1" icon="heading 1" />
            <BlockButton format="h2" text="Heading 2" icon="heading 2" />
            <BlockButton format="h3" text="Heading 3" icon="heading 3" />
            <VerticalLine />
            <IndenButton format="increase" text="Increase Indentation" icon="increase-indentation"/>
            <IndenButton format="decrease" text="Decrease Indentation" icon="decrease-indentation"/>
            <BlockButton format="ol" text="Ordered List" icon="ordered-list" />
            <BlockButton format="ul" text="Bullet List" icon="unordered-list" />
            <VerticalLine />
            <AlignButton format="left" text="Align Left" icon="align-left" />
            <AlignButton format="center" text="Align Center" icon="align-center"/>
            <AlignButton format="right" text="Align Right" icon="align-right" />
            <AlignButton format="justify" text="Align Justify" icon="align-justify"/>
            <VerticalLine />
            <AddTableButton text="Add Table" icon="table" />
            {/* <TableButton format="insert-row" text="Insert Row" />
            <TableButton format="insert-column" text="Insert Column" />
            <TableButton format="remove-row" text="Remove Row" />
            <TableButton format="remove-column" text="Remove Column" /> */}
            <VerticalLine />
            <Toggle value={themeContext.isDark} onSelect={() => themeContext.toggleTheme()}/>
        </StyledToolbar>
    )
}

export default ToolBar