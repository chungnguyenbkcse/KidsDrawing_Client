import React, {useRef} from "react";
import ReactQuill, { Quill } from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./Style.css";
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

export const Editor = (props) => {
  console.log('editor')
  const reactQuillRef = useRef(null);
  console.log(props.isCreate)
  console.log(props.setValue)
  React.useEffect(() => {
    if (props.isCreate === ""){
        reactQuillRef.current.getEditor().clipboard.dangerouslyPasteHTML(props.setValue)
    }
    else {
        if (reactQuillRef.current.getEditor() && state.value === null){
            reactQuillRef.current.getEditor().clipboard.dangerouslyPasteHTML(props.setValue)
        }
    }
  }, [reactQuillRef, props]);
  //console.log(reactQuillRef)
  
  //const quill = reactQuillRef.current.editor;
  //console.log(quill)
  //quill.clipboard.dangerouslyPasteHTML(props.setValue);
  const [state, setState] = React.useState({ value: null });
  const handleChange = value => {
    setState({ value });
    props.getValue(value)
    //console.log(value)
  };

  console.log(state.value)
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
