import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { DATABASE_MAIN } from "../contexts/api";
//import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CronicleEditor = (props) => {
  const [cronicle, setCronicle] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    fetchCronicle(props.id);
  }, [props.id]);

  async function fetchCronicle(id) {
    await fetch(`${DATABASE_MAIN}cronicle.php?id=${id}`)
      .then((response) => {
        response.json().then((data) => {
          const trasformedCronic = data.map((item) => {
            return {
              id: item.id,
              name: item.name,
              moto: item.moto,
              text: item.text,
              counter: item.counter,
              date: item.date,
            };
          });      
          return setCronicle(trasformedCronic[0]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    //console.log(cronicle);
    if (cronicle){
      const blocksFromHTML = convertFromHTML(cronicle.text);
      //You need to use the below customContentStateConverter function to convert content state before passing to createWithContent.
      setEditorState(
        EditorState.createWithContent(
          customContentStateConverter(
            ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            ))
      ));
    }    
  }, [cronicle]);

  const customContentStateConverter = (contentState) => {
    // changes block type of images to 'atomic'
    const newBlockMap = contentState.getBlockMap().map((block) => {
        const entityKey = block.getEntityAt(0);
        if (entityKey !== null) {
            const entityBlock = contentState.getEntity(entityKey);
            const entityType = entityBlock.getType();
            switch (entityType) {
                case 'IMAGE': {
                    const newBlock = block.merge({
                        type: 'atomic',
                        text: 'img',
                    });
                    return newBlock;
                }
                default:
                    return block;
            }
        }
        return block;
    });
    const newContentState = contentState.set('blockMap', newBlockMap);
    return newContentState;
}

  const uploadImageCallback = (file, callback) => {
    //console.log(file);
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        const form_data = new FormData();
        form_data.append("file", file);
        await fetch(`${DATABASE_MAIN}uploadFile.php`, {
          method: "POST",
          body: form_data,
          //headers: { "Content-Type": "multipart/form-data", },
          mode: "cors",
        })
        .catch((error) => console.log(error))
        .then((response)=>{
            if (response.ok){
              response.json()
              .then(resp => resolve({ data: { link: "https://www.oskelt.cz/" + resp.fileName }}))
            }
          }
        );

        //console.log(process.env);
        
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div id="cronicleEdit">
      <div className="p-1 mb-1 border rounded-2 shadow w-75 mx-auto">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { 
              urlEnabled: true,
              uploadEnabled: true,
              uploadCallback: uploadImageCallback, 
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            },
          }}
        />
        
      </div>
      <div className="row w-75 mx-auto">
        <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />  
      </div>
      <div className="row w-75 mx-auto">
        {props.id ? <button>Uložit</button>:<button>Uložit jako nový</button>}
        </div>
    </div>
  );
};

export default CronicleEditor;
