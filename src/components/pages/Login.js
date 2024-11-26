import { Fragment } from "react";
import LoginForm from "../login/LoginForm";
import LoginAbout from "../login/LoginAbout";
import { useTranslation } from "react-i18next";
import "../localization/i18n";

const Login = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
    <div className="modal" id="loginModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{t("login")}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"/>
          </div>
          <div className="modal-body">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
    <div className="modal" id="aboutModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{t("about")}</h4>
            <button type="button" className="btn-close"data-bs-dismiss="modal"/>
          </div>
          <div className="modal-body">
            <LoginAbout />
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default Login;
