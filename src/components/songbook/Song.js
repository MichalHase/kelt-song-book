import React, { useState } from "react";
//import { useTranslation } from "react-i18next";
import "../localization/i18n";
//import { DATABASE_MAIN } from "../contexts/api";
//import { Link } from "react-router-dom";
//import AuthContext from "../contexts/auth";
import ChordSheetJS from 'chordsheetjs';
import "./song.css"

const Song = (props) => {
  //const { t } = useTranslation();
  //const authCtx = useContext(AuthContext);
  const [isShow, setIsShow] = useState(false);

  const parser = new ChordSheetJS.ChordProParser();
  const song = parser.parse(props.song);
  const formatter = new ChordSheetJS.HtmlDivFormatter();
  const disp = formatter.format(song);

  const onShow = () => {
    setIsShow(!isShow);
    //window.location.href="#songbook";
  };

  return (
    <div>
      <hr className="featurette-divider" />
      <div className="row">
        <div className="col-md-4">
          <h2 className="">
            {props.songname} <span className="text-muted">{props.autorname}</span>
            <button className="btn btn-primary bi bi-play-circle" onClick={onShow} />
          </h2>
        </div>
        {isShow &&
        <div className="col-md-4">
          <p className="lead">
            <div id="chordProReader" dangerouslySetInnerHTML={{__html: disp}} />
          </p>
        </div>}
      </div>
    </div>
  );
};

export default Song;