import React from "react";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";
import "../localization/i18n";

const CommercialsList = () => {
  const { t } = useTranslation();

  return (
    <div id="comercials" className="pt-5">
      <div className="navbar-nav bg-primary bg-opacity-75 p-3">
        <h2 className="text-light">
          <i className="bi bi-badge-hd" /> {t("commercials")}
        </h2>
        <p className="text-light">{t("commercialsMessage")}</p>
      </div>
      <div className="container pt-5">
        <div className="row justify-content-md-center">
            <ReactPlayer className="col-md-auto" url="https://www.youtube.com/watch?v=4tMsNKtI2Lw&t" />
        </div>
      </div>
    </div>
  );
};

export default CommercialsList;
