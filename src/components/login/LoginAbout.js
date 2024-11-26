import { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/auth";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import { DATABASE_MAIN } from "../contexts/api";

const LoginAbout = () => {
  const authCtx = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [id, setId] = useState(0);
  const [nick, setNick] = useState("");
  const [func, setFunc] = useState("");
  const [moto, setMoto] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDay, setBirthDay] = useState(new Date());
  const [nameDay, setNameDay] = useState(new Date());
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  async function fetchMember(id) {
    setIsLoading(true);
    await fetch(`${DATABASE_MAIN}/member.php?id=${id}`).then((response) => {
      response
        .json()
        .then((data) => {
          setId(data.id);
          setNick(data.nick);
          setFunc(data.func);
          setText(data.text);
          setMoto(data.moto);
          setEmail(data.email);
          setBirthDay(data.birthDay);
          setNameDay(data.nameDay);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  useEffect(() => {
    setId(0);
  }, []);

  useEffect(() => {
    if (authCtx.token) {
      fetchMember(authCtx.token);
    }
  }, [authCtx]);

  const update = (data) => {
    if (selectedFile) {
      const dataArray = new FormData();
      dataArray.append("file", selectedFile[0]);
      dataArray.append("id", id);

      fetch(`${DATABASE_MAIN}/updateMemberImage.php`, {
        method: "POST",
        body: dataArray,
        /*headers: { "Content-Type": "multipart/form-data", },*/
        mode: "no-cors",
      }).catch((error) => console.log(error));
    }

    fetch(`${DATABASE_MAIN}/updateMember.php`, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors",
    }).catch((error) => console.log(error));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (authCtx.isLoggedIn && formIsValid) {
      const data = {
        id: id,
        nick: nick,
        func: func,
        moto: moto,
        text: text,
        email: email,
        birth: birthDay,
        name: nameDay,
        password: password,
      };
      update(data);
      fetchMember(authCtx.token);

      setSelectedFile(null);
      setPassword("");
    } else {
      alert("Can not save!");
    }
    //console.log(response);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        nick.trim().length > 0 &&
          func.trim().length > 0 &&
          moto.trim().length > 0 &&
          text.trim().length > 0 &&
          birthDay.trim().length > 0 &&
          nameDay.trim().length > 0 &&
          email.includes("@") &&
          password.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [nick, func, moto, text, email, password, birthDay, nameDay]);

  return (
    <section className="login" id="loginAbout">
      {isLoading && <div className="spinner-border text-info"></div>}
      <form onSubmit={onSubmitHandler} className="was-validated">
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            id="nick"
            value={nick}
            onChange={(item) => setNick(item.target.value)}
            placeholder={t("nick")}
            required
          />
          <label htmlFor="nick">{t("nick")}</label>
        </div>
        <div className="form-floating mb-3 mt-3">
          <input
            type="date"
            className="form-control"
            id="birthday"
            name="birthday"
            value={birthDay}
            onChange={(item) => setBirthDay(item.target.value)}
            placeholder={t("birthDay")}
            required
          />
          <label htmlFor="birthday">{t("birthDay")}</label>
        </div>
        <div className="form-floating mb-3 mt-3">
          <input
            //type="datetime-local"
            type="date"
            className="form-control"
            id="nameday"
            name="nameday"
            value={nameDay}
            onChange={(item) => setNameDay(item.target.value)}
            placeholder={t("nameDay")}
            required
          />
          <label htmlFor="nameday">{t("nameDay")}</label>
        </div>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            id="func"
            value={func}
            onChange={(item) => setFunc(item.target.value)}
            placeholder={t("func")}
            required
          />
          <label htmlFor="func">{t("func")}</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            id="moto"
            value={moto}
            onChange={(item) => setMoto(item.target.value)}
            placeholder={t("moto")}
            required
          />
          <label htmlFor="moto">{t("moto")}</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <textarea
            rows="7"
            type="text"
            className="form-control"
            id="text"
            value={text}
            onChange={(item) => setText(item.target.value)}
            placeholder={t("text")}
            required
          />
          <label htmlFor="text">{t("text")}</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(item) => setEmail(item.target.value)}
            placeholder={t("email")}
            required
          />
          <label htmlFor="email">{t("email")}</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(item) => setPassword(item.target.value)}
            placeholder={t("password")}
            required
          />
          <label htmlFor="password">{t("password")}</label>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!formIsValid}
          //data-bs-dismiss="modal"
        >
          {t("save")}
        </button>
      </form>
    </section>
  );
};

export default LoginAbout;
