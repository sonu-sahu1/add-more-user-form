import React, { useMemo, useState } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";

const MyRichEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  // Ensure value is always an array
  if (!Array.isArray(value)) {
    console.error("Slate initialValue is invalid! Expected a list of elements but got:", value);
    return null;
  }

  return (
    value && (
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        
      </Slate>
    )
  );
};

export default MyRichEditor;
