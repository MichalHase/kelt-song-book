import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import { DATABASE_MAIN } from "../contexts/api";

const ContactForm = (props) => {
  const { t } = useTranslation();
  const [isValidate, setIsvalidate] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredText, setEnteredText] = useState("");

  useEffect(() => {
    if (enteredText.trim().length > 0 && enteredEmail.includes("@")) {
      setIsvalidate(true);
    } else {
      setIsvalidate(false);
    }
  }, [enteredText,enteredEmail]);

  const submitHandler = (event) => {
    event.preventDefault();

    const mail = {
      to: "oskelt@oskelt.cz",
      subject: "Zpráva z webu",
      message: enteredText,
      from: enteredEmail,
    };
    
    SendMail(mail);
  };

  async function SendMail(mail) {
    await fetch(`${DATABASE_MAIN}mailer.php`, {
      method: "POST",
      body: JSON.stringify(mail),
      /* headers: {
        "Access-Control-Allow-Origin": "https://oskelt.cz",
        "content-type": "application/json",
      }, */
      mode: "cors",
    })
    .catch((error) => console.log(error))    
    .then((response)=>{if (response.ok){response.json().then(resp => 
      {
        if (resp.code === "1") {
          setEnteredEmail("");
          setEnteredText("");
          props.onClose();
        } else {
          console.log(resp.message);
          // TODO : tootltip poslatno
        }
      }
    )}});
  }

  //<i className="far fa-envelope" />
  return (
    <div id="contactForm" className="container-md p-5 border rounded-2 shadow w-75 mx-auto bg-light" >
      <i className="bi bi-chat-left-dots" />
      <div className="row">
        <form onSubmit={submitHandler} className="was-validated">
          <div className="form-floating mb-3 mt-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Váš email"
              name="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              required
            />
            <div className="invalid-feedback">Platný email na který Vám budeme odpovídat.</div>
            <label htmlFor="email">Váš email</label>
          </div>
          <div className="form-floating mb-3 mt-3">
            <textarea
              className="form-control h-75"
              placeholder="Vaše zpráva"
              id="text"
              rows="5"
              value={enteredText}
              onChange={(e) => setEnteredText(e.target.value)}
              required
            />
            <div className="invalid-feedback">Zpráva pro nás nesmí být prázdná.</div>
            <label htmlFor="text">Vaše zpráva</label>
          </div>
          <button className="btn btn-primary m-2" type="submit" disabled={!isValidate} >{t("send")}</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
