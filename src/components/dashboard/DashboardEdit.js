import React, { useEffect, useState, useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML, convertToRaw, } from "draft-js";
import draftToHtml from "draftjs-to-html";
//import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { useTranslation } from "react-i18next";
import { DATABASE_MAIN } from "../contexts/api";
import "../localization/i18n";
import AuthContext from "../contexts/auth";

const DashboardEdit = (props) => {
  const [dashboard, setDashboard] = useState();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [editorShow, setEditorShow] = useState(false);
  const authCtx = useContext(AuthContext);
  const { t } = useTranslation();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [nick, setNick] = useState("");
  const [visible, setVisible] = useState(false);

  async function fetchDashboard(id) {
    await fetch(`${DATABASE_MAIN}dashboard.php?id=${id}`)
      .then((response) => {
        response.json().then((data) => {
          const trasformedDashboard = data.map((item) => {
            return {
              id: item.id,
              name: item.name,
              text: item.text,
              nick: item.nick,
              visible: item.visible === "1" ? true : false,
            };
          });
          return setDashboard(trasformedDashboard[0]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const saveDashboard = (data) => {
    fetch(`${DATABASE_MAIN}updateDashboard.php`, {
      method: "POST",
      body: JSON.stringify(data),
      /*headers: { "Access-Control-Allow-Origin": "*","Content-Type": "multipart/form-data", },*/
      //mode: "no-cors",
    }).catch((error) => console.log(error));
  };

  useEffect(() => {
    //console.log(dashboard);
    if (dashboard) {
      setId(dashboard.id);
      setName(dashboard.name);
      setText(dashboard.text);
      setNick(dashboard.nick);
      setVisible(dashboard.visible);
      const blocksFromHTML = convertFromHTML(dashboard.text);
      const state = ContentState.createFromBlockArray(blocksFromHTML);
      setEditorState(EditorState.createWithContent(state));
      /* const contentBlock = htmlToDraft(dashboard.text);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(EditorState.createWithContent(editorState));
      } */
    }
  }, [dashboard]);

  useEffect(() => {
    if (props.id > 0) {
      fetchDashboard(props.id);
    }
  }, [props.id]);

  const submitForm = (event) => {
    event.preventDefault();

    if (name.trim().length > 0 && text.trim().length > 0) {
      const data = {
        id: id,
        name: name,
        text: text,
        nick: authCtx.name,
        visible: visible ? "1" : "0",
      };
      saveDashboard(data);
      props.onSaved();
      //console.log(data);
    } else {
      alert("Can not save!");
    }
  };

  const onEditorStateChangeHandler = (editorState) => {
    setEditorState(editorState);
    const plainHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setText(plainHtml);
  };

  /* const onContentStateChangeHandler = (editorContent) => {
    //setEditorState(e);
    //const temp = draftToHtml(convertToRaw(editorContent.getCurrentContent()));
    //const temp = draftToHtml(convertToRaw(editorContent));
    console.log(editorContent);
  } */

  const onTextChangeHandler = (e) =>{
    setText(e.target.value);
    const blocksFromHTML = convertFromHTML(e.target.value);
    if (blocksFromHTML){
        const state = ContentState.createFromBlockArray(blocksFromHTML);
        setEditorState(EditorState.createWithContent(state));
    }  
  }

  return (
    <div id="dashboardEdit" className="p-5">
      <div className="text-center p-2">
        <button className="btn btn-outline-primary" onClick={props.onClose}>
          {t("close")}
        </button>
      </div>
      

      <form className="" onSubmit={submitForm}>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(item) => setName(item.target.value)}
          />
          <label htmlFor="name">{t("dashboardName")}</label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="visibility"
            checked={visible}
            onChange={(item) => setVisible(item.target.checked)}
          />
          <label className="form-check-label" htmlFor="visibility">
            {t("dashboardVisibility")}
          </label>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="showPlainText"
            onChange={(e) => {setEditorShow(e.target.checked)}}
          />
          <label className="form-check-label" htmlFor="showPlainText">
            {t("showEditor")}
          </label>
        </div>

        {editorShow && (
        <div className="border rounded-2 shadow">
          <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorState={editorState}
            onEditorStateChange={onEditorStateChangeHandler}
            //onContentStateChange={onContentStateChangeHandler}
          />
        </div>
        )}

        <div className="form-floating mb-3 mt-3">
          <textarea
            type="text"
            className="form-control h-50"
            id="text"
            rows="15"
            value={text}
            onChange={onTextChangeHandler}
            disabled = {editorShow}
          />
          <label htmlFor="text">{t("dashboardText")}</label>
        </div>
        <div>{t("lastUpdate")}{": "}{nick}</div>
        <button className="btn btn-outline-primary">{t("save")}</button>
      </form>
    </div>
  );
};

export default DashboardEdit;
