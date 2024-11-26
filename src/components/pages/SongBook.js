//import cronicleImage from "../../assets/head_cronic.png";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import "../localization/i18n";
import { useParams } from "react-router-dom";
import SongBookEditor from "../songbook/SongBookEditor";
import SongBookList from "../songbook/SongBookList";

const SongBook = () => {
  const { t } = useTranslation();
  //<SongBookEditor id={params.cronicleId} />
  const [songListId, setSongListId] = useState(0);
  const id = 1;
  const params = useParams();
  console.log(params.cronicleId);
  return (
    <div id="home" className="container-fluid-sm pt-5">
      <div className="row navbar-nav bg-light p-2">
        <div className="text-center">
          <button type="button" className="col-md btn btn-info m-1 bi bi-journal fa-4x" onClick={() => setSongListId(0)}> {t("all")}</button>
          <button type="button" className="col-md btn btn-danger m-1 bi bi-journal fa-4x" onClick={() => setSongListId(1)}> {t("red")}</button>
          <button type="button" className="col-md btn btn-warning m-1 bi bi-journal fa-4x" onClick={() => setSongListId(2)}> {t("yellow")}</button>
        </div>
      </div>
      <SongBookList songListId={songListId}/>
      <SongBookEditor id={id} />
    </div>
  );
};

export default SongBook;
