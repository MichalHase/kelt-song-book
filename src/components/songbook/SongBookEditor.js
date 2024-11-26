import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { DATABASE_MAIN } from "../contexts/api";
//import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ChordSheetJS from 'chordsheetjs';
import "./song.css"

const SongBookEditor = (props) => {
  const [song, setSong] = useState();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [songParsedText, setSongParsedText] = useState("");

  useEffect(() => {
    fetchSongs(props.id);
  }, [props.id]);

  async function fetchSongs(id) {
    await fetch(`${DATABASE_MAIN}songs.php?id=${id}`)
      .then((response) => {
        response.json().then((data) => {
          const trasformedCronic = data.map((item) => {
            return {
              id: item.id,
              songname: item.songname,
              autorname: item.autorname,
              songText: item.song,
              nick: item.nick,
              songlist: item.songlist,
            };
          });      
          return setSong(trasformedCronic[0]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    //console.log(cronicle);
    if (song){
      const blocksFromHTML = convertFromHTML(song.songText);
      //You need to use the below customContentStateConverter function to convert content state before passing to createWithContent.
      setEditorState(
        EditorState.createWithContent(
          customContentStateConverter(
            ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            )
          )
        )
      );
      
      getSongParsed(song.songText);

    }    
  }, [song]);

  const getSongParsed = (songText) => {
    const parser = new ChordSheetJS.ChordProParser();
    const songParsed = parser.parse(songText);
    const formatter = new ChordSheetJS.HtmlDivFormatter();
    setSongParsedText(formatter.format(songParsed));
  };

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

  return (
    <div id="songEdit">

      <div className="row p-1 mb-1 border rounded-2 shadow w-75 mx-auto">
        <div className="col-md-6 border rounded-2 shadow">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
              options: ['inline','blockType','fontSize','textAlign','colorPicker','history'],
              inline: { inDropdown: true },            
              textAlign: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </div>
        <div className="col-md-6 border rounded-2 shadow">
          <p className="lead">
            <div id="chordProReader" dangerouslySetInnerHTML={{__html: songParsedText}} />
          </p>
        </div>
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

export default SongBookEditor;
