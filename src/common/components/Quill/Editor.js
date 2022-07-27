import React, {useRef} from "react";
import ReactQuill, { Quill } from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./Style.css";
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

export const Editor = (props) => {
  const reactQuillRef = useRef(null);
  React.useEffect(() => {
    if (reactQuillRef.current.getEditor() && !props.isCreate){
        reactQuillRef.current.getEditor().clipboard.dangerouslyPasteHTML(props.setValue)
    }
  }, [reactQuillRef.current]);
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
