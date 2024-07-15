import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import ExampleTheme from "./themes/ExampleTheme";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  theme: ExampleTheme,
  onError(error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

function Editor() {
  const [editorState, setEditorState] = useState();

  function onChange(editorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  useEffect(() => {
    console.log(editorState, 'editorState');
  }, [editorState]);

  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <TreeViewPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
        <MyOnChangePlugin onChange={onChange} />
      </LexicalComposer>
      {editorState && <FormattedOutput editorState={editorState} />}
    </>
  );
}

function FormattedOutput({ editorState }) {
  const parsedState = JSON.parse(editorState);

  // Function to recursively render the state as HTML
  const renderState = (node) => {
    if (!node) return null;

    switch (node.type) {
      case 'paragraph':
        return (
          <p className="editor-paragraph" dir="ltr">
            {node.children.map(renderState)}
          </p>
        );
      case 'code':
        return (
          <pre className="editor-code" spellCheck="false" data-highlight-language="javascript">
            {node.children.map(renderState)}
          </pre>
        );
      case 'text':
        const className = `editor-token${capitalizeFirstLetter(node.style || '')}`;
        return (
          <span className={className} style={{ whiteSpace: 'pre-wrap' }}>
            {node.text}
          </span>
        );
      default:
        // Handle other node types if necessary
        return node.children ? node.children.map(renderState) : null;
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return <div>{parsedState.root.children.map(renderState)}</div>;
}

export default Editor;
