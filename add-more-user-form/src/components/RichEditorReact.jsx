import React from "react";
import "../App.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
// import {ReactRichEditor} from "react-rich-text-editor";
// import {react-rich-text-editor} from "react-rich-text-editor";


const RichEditorReact = () => {
  const codeString = `
  import React from 'react';

  const HelloWorld = () => {
    return <h1>Hello, world!</h1>;
  }

  export default HelloWorld;
`;
  console.log(codeString, "codeStringcodeString");
  return (
    <div className="App">
      <h1>Rich Tech Editor</h1>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {codeString}
      </SyntaxHighlighter>
      <div>{/* <ReactRichEditor height={200} /> */}</div>
    </div>
  );
};

export default RichEditorReact;
