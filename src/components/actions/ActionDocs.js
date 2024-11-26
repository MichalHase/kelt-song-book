import React, { useState, useEffect } from "react";
import { DATABASE_MAIN } from "../contexts/api";

//import { useTranslation } from "react-i18next";
//import "../localization/i18n";

const ActionDocs = (props) => {
  //const { t } = useTranslation();
  const [actionsCtx, setActionsCtx] = useState();  

  useEffect(() => {
    setActionsCtx(props.actions.map((item) => (
        <a key={"ac"+item.id} className="col-md btn btn-light m-1" href={`${DATABASE_MAIN}actionOrderFile.php?id=${item.id}`} target="new">
          <div className="bi bi-clipboard fa-2x" /> {"Pokyny "+item.name}
        </a>
      )));
  }, [props.actions]);

  return (
    <div id="documents" className="p-1 mb-1 border rounded-2 shadow">
      <h3 className="text-center">
        <i className="bi bi-file-earmark-pdf" />
        Nezbytné dokumenty
      </h3>
      <div className="row p-3 m-5">
        <a className="col-md btn btn-success m-1" href="https://www.oskelt.cz/docs/Prihlaska.pdf" target="new">
          <div className="bi bi-clipboard-plus fa-2x" /> Přihláška
        </a>
        <a className="col-md btn btn-dark m-1" href="https://www.oskelt.cz/docs/PrihlaskaCast2.pdf" target="new">
          <div className="bi bi-clipboard-plus fa-2x" /> Přihláška 2. část
        </a>
        <a className="col-md btn btn-info m-1" href="https://www.oskelt.cz/docs/SouhlasZZ.pdf" target="new">
          <div className="bi bi-clipboard-data fa-2x" /> Souhlas zástupce
        </a>
        <a className="col-md btn btn-danger m-1" href="https://www.oskelt.cz/docs/Lekar.pdf" target="new">
          <div className="bi bi-clipboard-check fa-2x" /> Lékař
        </a>
        <a className="col-md btn btn-warning m-1" href="https://www.oskelt.cz/docs/Bezinfekcnost.pdf" target="new">
          <div className="bi bi-clipboard-minus fa-2x" /> Bezinfekčnost
        </a>
      </div>
      <div className="row p-3 m-5">
        {actionsCtx}
      </div>
    </div>
  );
};

export default ActionDocs;
