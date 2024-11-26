import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
//import logo from "../../logo.svg";
import AuthContext from "../contexts/auth";
//import { useTranslation } from "react-i18next";
//import "../localization/i18n";
//import i18n from "i18next";
//import cz from "../../assets/cz.png";
//import gb from "../../assets/gb.png";

const Header = () => {
  const authCtx = useContext(AuthContext);
  //const { t } = useTranslation();
  const location = useLocation();

 /*  const onCzClicked = () => {
    i18n.changeLanguage("cs");
  };
  const onEnClicked = () => {
    i18n.changeLanguage("en");
  }; */

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient fixed-top" id="mainNav">
      <div className="container">
        {/* <a href="/"><img className="navbar-brand" width="75px" height="75px" src={logo} alt="logo" /></a> */}
        <a href="/" className="nav-link logo-font"><i className="fas fa-campground" />KELT</a>
        {authCtx.isLoggedIn && (
          <NavLink className="nav-link" to="/rental">
            <i className="bi bi-box-seam" />
          </NavLink>
        )}
        {authCtx.isLoggedIn && (
          <NavLink className="nav-link" to="/songbook">
            <i className="bi bi-file-music" />
          </NavLink>
        )}

        {/* <img src={cz} alt="CZ" onClick={onCzClicked} />
        <img src={gb} alt="EN" onClick={onEnClicked} /> */}

        <button
          type="button"
          className="btn nav-link bi bi-person"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        />
        {authCtx.isLoggedIn && (
          <button
            type="button"
            className="btn nav-link text-light"
            data-bs-toggle="modal"
            data-bs-target="#aboutModal"
          >
            {authCtx.name}
          </button>
        )}

        <button
          className="navbar-toggler bg-primary text-white rounded"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-text-indent-left"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="nav nav-tabs ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                <i className="bi bi-house" />
              </a>
            </li>
            {location.pathname === "/home" && (
              <li className="nav-item">
                <a className="nav-link" href="#cronicle">
                  <i className="bi bi-book"></i>
                </a>
              </li>
            )}
            {location.pathname === "/home" && (
              <li className="nav-item">
                <a className="nav-link" href="#members">
                  <i className="bi bi-people"></i>
                </a>
              </li>
            )}
            {authCtx.isLoggedIn ? 
            <li className="nav-item">
              <a className="nav-link" href="#dashboard">
                <i className="bi bi-dash-square" />
              </a>
            </li>:
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                <i className="bi bi-bank" />
              </a>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

//<NavLink className="nav-link" to="/members">{t("members")}</NavLink>
//<NavLink className="nav-link" to="/cronicle">{t("cronicle")}</NavLink>
