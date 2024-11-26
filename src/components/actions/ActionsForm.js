import classes from "./ActionsList.module.css";

import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ActionsForm = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    //console.log(editorState);
  }, []);
  return (
    <section className={classes.actions}>
      <div className="p-1 mb-1 border rounded-2 shadow">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    </section>
  );
};

export default ActionsForm;
