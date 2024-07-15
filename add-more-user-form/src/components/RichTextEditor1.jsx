import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import Select from "react-select";
import {
  BtnBold,
  BtnItalic,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";

function RichTextEditor1() {
  const [html, setHtml] = useState("");

  function onChange(e) {
    setHtml(e.target.value);
  }
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <Select options={options} />
      <EditorProvider>
        {" "}
        <Editor value={html} onChange={onChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
          </Toolbar>{" "}
        </Editor>
      </EditorProvider>
    </>
  );
}
export default RichTextEditor1;
