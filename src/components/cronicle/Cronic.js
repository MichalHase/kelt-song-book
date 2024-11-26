import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import { DATABASE_MAIN } from "../contexts/api";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/auth";

const Cronic = (props) => {
  const { t } = useTranslation();
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <hr className="featurette-divider" />
      <div className="row">
        <div className={parseInt(props.id, 10) % 2 === 0 ? "col-md-7" : "col-md-7 order-md-2"}>
          <h2 className="">
            {props.name} <span className="text-muted">{props.moto}</span>
          </h2>
          <h4>{new Date(props.date).toLocaleDateString()}</h4>
          <p className="lead">
            {props.text.replace(/<[^>]+>/g, "").substring(0, 250)}
          </p>
          <div className="text-center">
            <button
              id={props.id}
              className="btn btn-outline-primary"
              onClick={props.onShow}
            >
              {t("read")}
            </button>
            {authCtx.isLoggedIn && (
              <Link
                className="btn btn-outline-primary ms-1"
                to={`/cronicle/${props.id}`}
              >{t("edit")}
              </Link>
            )}
            {props.fotogalery.length > 0 && (
              <a
                className="btn btn-outline-primary ms-1"
                href={props.fotogalery}
                target="new"
              >
                {t("fotogalery")}
              </a>
            )}
          </div>
        </div>
        <div className={parseInt(props.id, 10) % 2 === 0 ? "col-md-5" : "col-md-5 order-md-1"}>
          <img
            className="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
            src={`${DATABASE_MAIN}cronicleImage.php?id=${props.id}`}
            alt={props.name}
            width="500px"
            height="500px"
          />
        </div>
      </div>
    </div>
  );
};

export default Cronic;