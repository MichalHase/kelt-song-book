import { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/auth";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import { DATABASE_MAIN } from "../contexts/api";

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const [nick, setNick] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
 
  const { t } = useTranslation();
  const [rawLogin, setRawLogin] = useState(null);

  async function checkMember(data) {
   await fetch(`${DATABASE_MAIN}/memberCheck.php`, {
      method: "POST",
      body: JSON.stringify(data),
      //mode: "no-cors",
    })
    .then((response) => {
      response.json().then(data => setRawLogin(data))})
    .catch((error) => console.log(error));
      
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (formIsValid && !authCtx.isLoggedIn) {
      const data = {
        nick: nick,
        password: enteredPassword,
      };
      checkMember(data);
    }
  };

  useEffect(() => {
    if (rawLogin){
      authCtx.login(
        rawLogin.id,
        rawLogin.email,
        rawLogin.nick,
        `${DATABASE_MAIN}memberImage.php?nick=${rawLogin.nick}`
      );
      setRawLogin(null);
      setFormIsValid(false);
    }
  }, [rawLogin,authCtx]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        nick &&
        enteredPassword.trim().length > 6);
    }, 500);

    return () => { clearTimeout(identifier); };
  }, [nick, enteredPassword]);

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  return (
    <section className="login" id="loginForm">
      <form onSubmit={onSubmitHandler} className="was-validated">
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            id="nick"
            value={nick}
            onChange={(item) => setNick(item.target.value)}
            required
          />
          <label htmlFor="nick">{t("nick")}</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="password"
            className="form-control"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            required
          />
          <label htmlFor="password">{t("password")}</label>
        </div>

        <button
          className="btn btn-primary me-1"
          type="submit"
          disabled={!formIsValid}
          data-bs-dismiss="modal"
        >
          {t("login")}
        </button>
        <button
          className="btn btn-primary me-1"
          type="submit"
          disabled={!authCtx.isLoggedIn}
          data-bs-dismiss="modal"
          onClick={()=>{ setEnteredPassword(""); authCtx.logout();}}
        >
          {t("logout")}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
