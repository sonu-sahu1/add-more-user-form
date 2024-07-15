// import DraftEditor from "./components/DraftEditor";
import Forms from "./components/Forms";
import LexicalEditor from "./components/MyLexicalEditor";
// import MyRichEditor from "./components/MyRichEditor";
import QrCodeGenerate from "./components/QrCodeGenerate";
import RichEditorReact from "./components/RichEditorReact";
import RichTextEditor1 from "./components/RichTextEditor1";
import React_Ace_Jodit from "./components/ReactAceJodit";
import "./styles.css"
function App() {
  return (
    <>
      <div className="App">
        {/* <LexicalEditor/>
     
        <RichEditorReact />
        <Forms />
        <QrCodeGenerate /> */}
        <React_Ace_Jodit/>
       
      </div>
    {/* <div> <RichTextEditor1/></div> */}
    {/* <div className="App">
      <DraftEditor/>

    </div> */}
    </>
  );
}

export default App;
