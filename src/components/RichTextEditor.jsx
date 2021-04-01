// eslint-disable-next-line no-unused-vars
import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from "prop-types";
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import Element from './Element';
import Leaf from './Leaf';
import {
  StyledBody,
  StyledContainer,
  StyledToolbar,
  VerticalLine,
} from './StyledComponents';
import { AlignButton, BlockButton, IndenButton, MarkButton, AddTableButton, TableButton, FontSizeButton } from './ToolbarButtons';
import Toggle from './Toggle';


const RichTextEditor = (props) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState([
    {
      type: 'h1',
      children: [{text: 'TTG Rich Text Editor using Slate.js'}]
    },
    {
      type: 'p',
      children: [{ text: 'Start using it right now...' }],
    }
  ]);
  const renderElement = useCallback((props) => {
    return <Element {...props} />;
  }, []);
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);
  return (
    <StyledContainer>
      <Slate
        editor={editor}
        value={value}
        onChange={(newVal) => setValue(newVal)}
      >
        <StyledToolbar>
            <MarkButton  format="bold" text="Bold" icon="bold"/>
            <MarkButton  format="italic" text="Italic" icon="italic"/>
            <MarkButton  format="underline" text="Underline" icon="underline"/>
            <VerticalLine />
            <FontSizeButton text='Font Size' />
            <VerticalLine/>
            <BlockButton format="h1" text="Heading 1" icon="heading 1"/>
            <BlockButton format="h2" text="Heading 2" icon="heading 2"/>
            <BlockButton format="h3" text="Heading 3" icon="heading 3"/>
            <VerticalLine/>
            <IndenButton format="increase" text="Increase Indentation" icon="increase-indentation"/>
            <IndenButton format="decrease" text="Decrease Indentation" icon="decrease-indentation"/>
            <BlockButton format="ol" text="Ordered List" icon="ordered-list"/>
            <BlockButton format="ul" text="Bullet List" icon="unordered-list"/>
            <VerticalLine/>
            <AlignButton format="left" text="Align Left" icon="align-left"/>
            <AlignButton format="center" text="Align Center" icon="align-center"/>
            <AlignButton format="right" text="Align Right" icon="align-right"/>
            <AlignButton format="justify" text="Align Justify" icon="align-justify"/>
            <VerticalLine/>
            <AddTableButton text="Add Table" icon="table"/>
            <TableButton format="insert-row" text="Insert Row"/>
            <TableButton format="insert-column" text="Insert Column"/>
            <TableButton format="remove-row" text="Remove Row"/>
            <TableButton format="remove-column" text="Remove Column"/>
            <VerticalLine/>
            <Toggle value={props.isDark} onSelect={() => props.setIsDark(!props.isDark)}/>
        </StyledToolbar>
        <StyledBody>
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} autoFocus spellCheck={false}/>
        </StyledBody>
      </Slate>
    </StyledContainer>
  );
};
RichTextEditor.propTypes = {
  isDark: PropTypes.bool,
  setIsDark: PropTypes.func
}

export default RichTextEditor;
