import { useTranslation } from "react-i18next";
import "../localization/i18n";

const SignUpCheckers = (props) => {
  const { t } = useTranslation();
  return (
    <div className="container bg-dark text-light">
      <div className="row">
        <div className={props.firstShow ? "col-3 bg-light text-dark" : "col-3"}>
          <div className="row">
            {props.firstState ? (
              <i className="bi bi-check-circle fa-2x text-success text-center" />
            ) : (
              <i className="bi bi-circle fa-2x text-center" />
            )}
          </div>
          <div className="row"><div className="text-center">{t("chooseAction")}</div></div>
        </div>
        <div className={props.secondShow ? "col-3 bg-light text-dark" : "col-3"}>
          <div className="row">
            {props.secondState ? (
              <i className="bi bi-check-circle fa-2x text-success text-center" />
            ) : (
              <i className="bi bi-circle fa-2x text-center" />
            )}
          </div>
          <div className="row"><div className="text-center">{t("enterCaptcha")}</div></div>
        </div>
        <div className={props.thirdShow ? "col-3 bg-light text-dark" : "col-3"}>
          <div className="row">
            {props.thirdState ? (
              <i className="bi bi-check-circle fa-2x text-success text-center" />
            ) : (
              <i className="bi bi-circle fa-2x text-center" />
            )}
          </div>
          <div className="row"><div className="text-center">{t("enterForm")}</div></div>
        </div>
        <div className={props.lastShow ? "col-3 bg-light text-dark" : "col-3"}>
          <div className="row">
            {props.lastState ? (
              <i className="bi bi-check-circle fa-2x text-success text-center" />
            ) : (
              <i className="bi bi-circle fa-2x text-center" />
            )}
          </div>
          <div className="row">
            <div className="text-center">{t("confirmForm")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCheckers;
