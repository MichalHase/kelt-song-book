import { useEffect, useRef } from "react";
import {loadCaptchaEnginge,LoadCanvasTemplateNoReload,validateCaptcha,} from "react-simple-captcha";
import { useTranslation } from "react-i18next";
import "../localization/i18n";

const Captcha = (props) => {
  const { t } = useTranslation();
  const inputRef = useRef();

  useEffect(() => {
    loadCaptchaEnginge(6);
    //loadCaptchaEnginge(5, "teal", "#dc0045", "numbers"); // "upper, lower, special_char"
  }, []);

  const doSubmit = () => {
    let user_captcha = inputRef.current.value;

    if (validateCaptcha(user_captcha) === true) {
      props.onCaptchaState(true);
    } else {
      loadCaptchaEnginge(6);
      alert(t("captchaAlert"));
      props.onCaptchaState(false);
    }
  };

  return (
    <div className="row justify-content-md-center">
      <div className="col-md-auto">
        <LoadCanvasTemplateNoReload
          reloadText={t("reloadText")}
          reloadColor="red"
        />
      </div>
      <div className="col-md-auto">
        <input
          placeholder={t("captchaPlaceholder")}
          id="user_captcha_input"
          name="user_captcha_input"
          type="text"
          ref={inputRef}
        />
      </div>
      <div className="col-md-auto">
        <button className="btn btn-primary" onClick={doSubmit}>
          {t("submit")}
        </button>
      </div>
    </div>
  );
};

export default Captcha;
