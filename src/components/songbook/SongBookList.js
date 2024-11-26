import React, { useState, useEffect } from "react";
import Song from "./Song";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import { DATABASE_MAIN } from "../contexts/api";

const SongBookList = (props) => {
  const [songsAll, setSongsAll] = useState([]);
  const [showCronicleAll, setShowCrocicleAll] = useState(false);
  const [song, setSong] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const [isShow, setIsShow] = useState(false);
  const [songId, setSongId] = useState(0);
  const [songText, setSongText] = useState("");
  //const [songListId, setSongListId] = useState(props.songListId);

  useEffect(() => {
    fetchSongs();
  },[props.songListId]);

  async function fetchSongs() {
    setIsLoading(true);
    await fetch(`${DATABASE_MAIN}songs.php?songlist=${props.songListId}`)
      .then((response) => {
        response.json().then((data) => {
          const trasformedSongs = data.map((songItem) => {
            return {
              id: songItem.id,
              songname: songItem.songname,
              autorname: songItem.autorname,
              song: songItem.song,
              nick: songItem.nick,
              songlist: songItem.songlist,
            };
          });
          return setSongsAll(
            trasformedSongs.map((item) => (
              <Song
                key={item.id}
                id={item.id}
                songname={item.songname}
                autorname={item.autorname}
                song={item.song}
                nick={item.nick}
                songlist={item.songlist}
                onShow={(e)=>{setSongId(parseInt(e.target.id, 10));}}
              />
            ))
          );
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const onCloseDetail = () => {
    setSongId(0);
    setSongText("");
    setIsShow(false);
    window.location.href="#songbook";
  };

  useEffect(() => {
    if (songId > 0) {
      const cronicle = songsAll.find(item => parseInt(item.key, 10) === songId);
      if (cronicle){
        setSongText(cronicle.props.text);
        window.location.href="#songDetail";
        setIsShow(true);
      }
    }
  }, [songId,songsAll]);

  useEffect(() => {
    setShowCrocicleAll(props.showAll);
  }, [props.showAll]);

  useEffect(() => {
    if (songsAll) {
      if (showCronicleAll) {
        //window.location.href="#cronicle";
        setSong(songsAll);
      } else {
        //window.location.href="#cronicleDetail";
        let cronicleSel = [];
        for (var i = 0; i < 3; i++) {
          cronicleSel.push(songsAll[i]);
        }
        setSong(cronicleSel);
      }
    }
  }, [songsAll, showCronicleAll]);

  const onShowAllClicked = () => {
    setShowCrocicleAll(!showCronicleAll);
    window.location.href="#songbook";
  };

  return (
    <div id="song" className="pt-5">
      <div className="navbar-nav bg-primary p-3 bg-opacity-75">
        <h2 className="text-light">
          <i className="bi bi-file-music" /> {t("songBook")}
        </h2>
        <p className="text-light">{t("songMessage")}</p>
      </div>
      {isLoading && <div className="spinner-border text-info"></div>}
      
      <div id="songList" className="container-fluid-md p-5 align-middle">
        <div className="row">{song}</div>
      </div>
      
      <div id="songDetail" className="p-5">
        {isShow &&
          <div className="p-1 mb-1 border rounded-2 shadow">
            <div dangerouslySetInnerHTML={{ __html: songText }} />
            <div className="text-center">
              <button type="button" className="btn btn-outline-primary bi bi-book" onClick={onCloseDetail}> {t("close")}</button>
            </div>
          </div>}
      </div>

      <div id="cronicleControls" className="text-center p-3">
        <button className="btn btn-outline-dark" onClick={onShowAllClicked}>
          {t("readAll")}
        </button>
      </div>
    </div>
  );
};

export default SongBookList;
