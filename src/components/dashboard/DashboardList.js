import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import { DATABASE_MAIN } from "../contexts/api";
import DashboardEdit from "./DashboardEdit";

const DashboardList = () => {
  const [dashboardAll, setDashboardAll] = useState([]);
  const [dashboardCtx, setDashboardCtx] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [showHidden, setShowHidden] = useState(false);
  const [dashboardId, setDashboardId] = useState(-1);

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (dashboardId > 0){
      window.location.href= "#dashboardEdit"   
    }
    if (dashboardId === 0){
      window.location.href= "#dashboard"   
    }

    //window.location.href=dashboardId > 0 ? "#dashboardEdit" : "dashboard";
  }, [dashboardId]);

  async function fetchDashboard() {
    setIsLoading(true);
    await fetch(`${DATABASE_MAIN}dashboard.php`)
      .then((response) => {
        response.json().then((data) => {
          const trasformedDashboard = data.map((dashItem) => {
            return {
              id: dashItem.id,
              name: dashItem.name,
              text: dashItem.text,
              nick: dashItem.nick,
              visible: dashItem.visible,
            };
          });
          return setDashboardAll(trasformedDashboard);
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (dashboardAll){
      if (showHidden){
        const temp = dashboardAll
        .map((item) => (
          <div className="col-md-6 border rounded" key={item.id}>
            <h3 className="text-center">{item.name}</h3>
            {/* <div dangerouslySetInnerHTML={{ __html: item.text }} /> */}
            <div className="text-center">
              <button className="btn btn-outline-primary" onClick={()=>{setDashboardId(parseInt(item.id, 10))}}>
                Edit
              </button>
            </div>
          </div>
        ));
        setDashboardCtx(temp);
      }else{
        const temp = dashboardAll
        .filter(fi => fi.visible === "1")
        .map((item) => (
          <div className="col-md-6 border rounded" key={item.id}>
            <h3 className="text-center">{item.name}</h3>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
            <div className="text-center">
              <button className="btn btn-outline-primary" onClick={()=>{setDashboardId(parseInt(item.id, 10))}}>
                Edit
              </button>
            </div>
          </div>
        ));
        setDashboardCtx(temp);
      }
    }
  }, [dashboardAll, showHidden]);

  const onEditorSaved = () => {fetchDashboard(); setDashboardId(0); setShowHidden(false);};

  const onEditorClose = () =>{setDashboardId(0)};

  return (
    <div id="dashboardList">
      {isLoading && <div className="spinner-border text-info"></div>}
      <div className="container-md pt-5 align-middle">
        <div className="row">{dashboardCtx}</div>
      </div>
      <div className="text-center pb-2 pt-2">
        <button className="btn btn-outline-primary" onClick={()=>{setShowHidden(!showHidden)}}>{showHidden ? t("hide"): t("showHidden")}</button>
      </div>
      {dashboardId > 0 && <DashboardEdit id={dashboardId} onClose={onEditorClose} onSaved={onEditorSaved} />}
    </div>
  );
};

export default DashboardList;
