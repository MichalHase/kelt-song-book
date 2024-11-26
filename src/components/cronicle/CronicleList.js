import React, { useState, useEffect } from "react";
import Cronic from "./Cronic";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import { DATABASE_MAIN } from "../contexts/api";

const CronicleList = (props) => {
  const [cronicleAll, setCronicleAll] = useState([]);
  const [showCronicleAll, setShowCrocicleAll] = useState(false);
  const [cronicle, setCronicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const [isShow, setIsShow] = useState(false);
  const [cronicleId, setCronicleId] = useState(0);
  const [cronicleText, setCronicleText] = useState("");

  useEffect(() => {
    fetchCronicles();
  },[]);

  async function fetchCronicles() {
    setIsLoading(true);
    await fetch(`${DATABASE_MAIN}cronicle.php`)
      .then((response) => {
        response.json().then((data) => {
          const trasformedCronic = data.map((cronicItem) => {
            return {
              id: cronicItem.id,
              name: cronicItem.name,
              moto: cronicItem.moto,
              text: cronicItem.text,
              counter: cronicItem.counter,
              date: cronicItem.date,
              fotogalery: cronicItem.fotogalery,
            };
          });
          return setCronicleAll(
            trasformedCronic.map((item) => (
              <Cronic
                key={item.id}
                id={item.id}
                name={item.name}
                moto={item.moto}
                date={item.date}
                text={item.text}
                fotogalery={item.fotogalery}
                onShow={(e)=>{setCronicleId(parseInt(e.target.id, 10));}}
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
    setCronicleId(0);
    setCronicleText("");
    setIsShow(false);
    window.location.href="#cronicle";
  };

  useEffect(() => {
    if (cronicleId > 0) {
      const cronicle = cronicleAll.find(item => parseInt(item.key, 10) === cronicleId);
      if (cronicle){
        setCronicleText(cronicle.props.text);
        window.location.href="#cronicleDetail";
        setIsShow(true);
      }
    }
  }, [cronicleId,cronicleAll]);

  useEffect(() => {
    setShowCrocicleAll(props.showAll);
  }, [props.showAll]);

  useEffect(() => {
    if (cronicleAll) {
      if (showCronicleAll) {
        //window.location.href="#cronicle";
        setCronicle(cronicleAll);
      } else {
        //window.location.href="#cronicleDetail";
        let cronicleSel = [];
        for (var i = 0; i < 3; i++) {
          cronicleSel.push(cronicleAll[i]);
        }
        setCronicle(cronicleSel);
      }
    }
  }, [cronicleAll, showCronicleAll]);

  const onShowAllClicked = () => {
    setShowCrocicleAll(!showCronicleAll);
    window.location.href="#cronicle";
  };

  return (
    <div id="cronicle" className="pt-5">
      <div className="navbar-nav bg-primary p-3 bg-opacity-75">
        <h2 className="text-light">
          <i className="bi bi-book" /> {t("cronicle")}
        </h2>
        <p className="text-light">{t("cronicleMessage")}</p>
      </div>
      {isLoading && <div className="spinner-border text-info"></div>}
      
      <div id="cronicleList" className="container-fluid-md p-5 align-middle">
        <div className="row">{cronicle}</div>
      </div>
      
      <div id="cronicleDetail" className="p-5">
        {isShow &&
          <div className="p-1 mb-1 border rounded-2 shadow">
            <div dangerouslySetInnerHTML={{ __html: cronicleText }} />
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

export default CronicleList;
