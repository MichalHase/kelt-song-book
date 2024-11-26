import React, { useState, useEffect } from "react";
import ContactForm from "../contact/ContactForm";
import { useTranslation } from "react-i18next";
import "../localization/i18n";

import Filip from "../../assets/Filip-avatar.jpg";
import Rene from "../../assets/Rene-avatar.jpg";
import Bobo from "../../assets/Bobo-avatar.jpg";
import Alca from "../../assets/Alca-avatar.jpg";

const Footer = () => {
  const [isContactShow, setIsContactShow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {}, []);

  //const onShowContactButton = () => {setIsContactShow(!isContactShow);};

  return (
    <div id="contact" className="bg-dark">
      <div className="navbar-nav bg-dark p-3">
        <h2 className="text-light">
          <i className="bi bi-bank" /> {t("contact")}
        </h2>
        <p className="text-light">{t("contactMessage")}</p>
      </div>

      <div className="container-md">
        <div className="row justify-content-center">
          <div className="card col-md mx-1">
            <div className="card-header">{t("place")}</div>
            <div className="card-body">
              <div className="card-text">občanský spolek KELT</div>
              <div className="card-text">Hodoňovice 235</div>
              <div className="card-text">739 01 Baška</div>
              <div className="card-text">IČO: 26581507</div>
              <div className="card-text">oskelt@oskelt.cz</div>
            </div>
          </div>

          <div className="card col-md mx-1">
            <div className="card-header">{t("chairman")}</div>
            <img
              className="card-img-top w-50 rounded mx-auto"
              src={Filip}
              alt="Filip Poledník"
            />
            <div className="card-body">
              <h4 className="card-title">Filip Poledník</h4>
              <p className="card-text"></p>
            </div>
          </div>

          <div className="card col-md mx-1">
            <div className="card-header">1. {t("vicechairman")}</div>
            <img
              className="card-img-top w-50 rounded mx-auto"
              src={Rene}
              alt="René Vrastyák"
            />
            <div className="card-body">
              <h4 className="card-title">René Vrastyák</h4>
              <p className="card-text"></p>
            </div>
          </div>

          <div className="card col-md mx-1">
            <div className="card-header">2. {t("vicechairman")}</div>
            <img
              className="card-img-top w-50 rounded mx-auto"
              src={Bobo}
              alt="Bohdana Jurášková"
            />
            <div className="card-body">
              <h4 className="card-title">Bohdana Jurášková</h4>
              <p className="card-text"></p>
            </div>
          </div>

          <div className="card col-md mx-1">
            <div className="card-header">{t("treasurer")}</div>
            <img
              className="card-img-top w-50 rounded mx-auto"
              src={Alca}
              alt="Alena Herrmannová"
            />
            <div className="card-body">
              <h4 className="card-title">Alena Herrmannová</h4>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
      </div>

      <div id="contactMessage" className="m-2">
        <div id="contactControls" className="text-center p-3">
          <button className="btn btn-outline-primary" onClick={()=>setIsContactShow(!isContactShow)} >
            {!isContactShow ? t("quickContact") : t("hide")}
          </button>
        </div>
        {isContactShow && <ContactForm onClose={()=>setIsContactShow(false)} />}
      </div>

      <div className="card-header">Designed by Hasman @2022</div>
    </div>
  );
};

export default Footer;
