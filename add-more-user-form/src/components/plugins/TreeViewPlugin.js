import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";

export default function TreeViewPlugin() {
  const [editor] = useLexicalComposerContext();
  const unregisterListener = editor.registerUpdateListener(({editorState}) => {
    // An update has occurred!
    console.log(editorState,'hhhhhhhhhhhh');
  });
  
  
  // Ensure we remove the listener later!
  unregisterListener();
  console.log("TreeViewPlugin - Editor:", editor,"tree-view-output");
  return (
    <TreeView
      viewClassName="tree-view-output"
      timeTravelPanelClassName="debug-timetravel-panel"
      timeTravelButtonClassName="debug-timetravel-button"
      timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
      timeTravelPanelButtonClassName="debug-timetravel-panel-button"
      editor={editor}
    />
  );
}
