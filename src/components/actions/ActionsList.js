import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DATABASE_MAIN } from "../contexts/api";
import "../localization/i18n";
import SignUp from "../signup/SignUp";
import ActionEdit from "./ActionEdit";
import ActionDocs from "./ActionDocs";
import AuthContext from "../contexts/auth";
import ActionsSignupList from "./ActionsSignupList";

const ActionsList = () => {
  const { t } = useTranslation();
  const authCtx = useContext(AuthContext);
  const [isSignaUpShow, setIsSignaUpFormShow] = useState(false);
  const [isActionEditShow, setIsActionEditShow] = useState(false);
  const [isActionDocsShow, setIsActionDocsShow] = useState(false);
  const [isActionSignupsShow, setIsActionSignupsShow] = useState(false);
  const [actions, setActions] = useState([]);
  const [actionsCtx, setActionsCtx] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  const onShowFormButton = () =>{
    setIsSignaUpFormShow(!isSignaUpShow);
    setIsActionEditShow(false);
    setIsActionDocsShow(false);
    setIsActionSignupsShow(false);
    window.location.href=!isSignaUpShow ? "#actionSignup" : "#action"
  };

  const onShowEditButton = () =>{
    setIsActionEditShow(!isActionEditShow);
    setIsSignaUpFormShow(false);
    setIsActionDocsShow(false);
    setIsActionSignupsShow(false);
    window.location.href=!isActionEditShow ? "#actionEdit" : "#action"
  };

  const onShowDocsButton = () =>{
    setIsActionDocsShow(!isActionDocsShow);
    setIsActionEditShow(false);
    setIsSignaUpFormShow(false);
    setIsActionSignupsShow(false);
    window.location.href=!isActionDocsShow ? "#documents" : "#action"
  };

  const onSignupButton = () =>{
    setIsActionSignupsShow(!isActionSignupsShow);
    setIsActionDocsShow(false);
    setIsActionEditShow(false);
    setIsSignaUpFormShow(false);
    window.location.href=!isActionSignupsShow ? "#actionsSignupList" : "#action"
  };

  async function fetchActions() {
    setIsLoading(true);
    await fetch(`${DATABASE_MAIN}actions.php`)
      .then((response) => {
        response.json().then((data) => {
          const action = data.map((rep) => {
            return {
              id: rep.id,
              name: rep.name,
              place: rep.place,
              text: rep.text,
              price: rep.price,
              fromDate: rep.fromDate,
              toDate: rep.toDate,
              descriptionShow: rep.descriptionShow === "1" ? true : false,
            };
          });
          setIsLoading(false);
          return setActions(action);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchActions();
  }, []);

  useEffect(() => {
    let setActive = " active";
    setActionsCtx(actions
      .map((item) => (
        <div key={"car"+item.id} className={"carousel-item" + setActive}>{setActive=""}
          <img src={`${DATABASE_MAIN}actionImage.php?id=${item.id}`} alt={item.name} className="w-100 d-block mx-auto max-hei" />
          {item.descriptionShow && <div className="carousel-caption d-none d-md-block">
            <h5 className="bg-light text-primary anton">{item.name}</h5>
            <p className="bg-light text-primary bg-opacity-75 anton">{new Date(item.fromDate).toLocaleDateString()}-{new Date(item.toDate).toLocaleDateString()}</p>
            <p className="bg-light text-primary bg-opacity-75 anton">{item.text + " " +item.price+",-"}</p>
          </div>}
        </div>
    )));
  }, [actions]);

  const updatedActions = () =>{
    setIsActionEditShow(false);
    fetchActions();
  }

  return (
    <div id="home" className="pt-5">
      <div className="navbar-nav bg-light"></div>

      <div id="action" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#action" data-bs-slide-to="0" className="active" ></button>
          <button type="button" data-bs-target="#action" data-bs-slide-to="1" ></button>
          <button type="button" data-bs-target="#action" data-bs-slide-to="2" ></button>
          <button type="button" data-bs-target="#action" data-bs-slide-to="3" ></button>
        </div>

        <div className="carousel-inner vh-70">
          {actionsCtx}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#action" data-bs-slide="prev" >
          <i className="bi bi-arrow-left-square text-primary fs-2" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#action" data-bs-slide="next" >
          <i className="bi bi-arrow-right-square text-primary fs-2" />
        </button>
      </div>

      {isSignaUpShow &&
        <div id="actionSignup" className="p-5">
          <SignUp actions={actions} />
        </div>
      }
      {isActionEditShow &&
        <div id="actionEdit" className="p-5">
          <ActionEdit actions={actions} updateHandler={updatedActions} />
        </div>
      }
      {isActionDocsShow &&
        <div id="actionDocs" className="p-5">
          <ActionDocs actions={actions}/>
        </div>
      }

      <div id="actionControls" className="text-center p-3">
        <button
          className="btn btn-outline-primary btn-lg m-1"
          onClick={onShowFormButton}
          >{!isSignaUpShow ? t("signup") : t("close")}
          {" "}<i className="bi bi-plus-square"/>
        </button>
        <button
          className="btn btn-outline-primary btn-lg m-1"
          onClick={onShowDocsButton}
          >{!isActionDocsShow ? t("docs") : t("close")}
          {" "}<i className="bi bi-file-earmark-pdf" />
        </button>
        { authCtx.isLoggedIn && <button
          className="btn btn-outline-primary btn-lg m-1"
          onClick={onShowEditButton}
          >{!isActionEditShow ? t("edit") : t("close")}
          {" "}<i className="bi bi-pencil"/>
        </button>}
        { authCtx.isLoggedIn && <button
          className="btn btn-outline-primary btn-lg m-1"
          onClick={onSignupButton}
          >{!isActionSignupsShow ? t("signupList") : t("close")}
          {" "}<i className="bi bi-card-list"/>
        </button>}
      </div>

      { isActionSignupsShow && <ActionsSignupList /> }
      
      {isLoading && <div className="spinner-border text-info"></div>}
    </div>
  );
};

export default ActionsList;
