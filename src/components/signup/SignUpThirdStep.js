import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../localization/i18n";

const SignUpThirdStep = (props) => {
  const { t } = useTranslation();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tShirtSize, setTShirtSize] = useState("");
  const [birthNumber, setBirthNumber] = useState("");
  const [address, setAddress] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      const result = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        tShirtSize: tShirtSize,
        birthNumber: birthNumber,
        parentName: parentName,
        parentPhone: phone,
        parentEmail: email,
        note: note,
      };
      props.onStepConfirm(result);
    }
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        firstName.trim().length > 0 &&
        lastName.trim().length > 0 &&
        address.trim().length > 0 &&
        tShirtSize.trim().length > 0 &&
        birthNumber.includes("/") &&
        parentName.trim().length > 0 &&
        email.includes("@") &&
        phone.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [firstName, lastName, address, tShirtSize, birthNumber, parentName, email, phone]);

  useEffect(() => {
    setPhone("+420");
    //setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <div id="signupThird" className="row pt-1">
      <form className="was-validated" onSubmit={onSubmitHandler}>
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(item) => setFirstName(item.target.value)}
              placeholder={t("firstName")}
              required
            />
            <label htmlFor="firstName">{t("firstName")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(item) => setLastName(item.target.value)}
              placeholder={t("lastName")}
              required
            />
            <label htmlFor="lastName">{t("lastName")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(item) => setAddress(item.target.value)}
              required
              placeholder="(ulice ČP , město, PSČ)"
            />
            <label htmlFor="address">{t("address")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="birthNumber"
              value={birthNumber}
              onChange={(item) => setBirthNumber(item.target.value)}
              required
              placeholder="(i s lomítkem)"
            />
            {/* <div class="invalid-feedback">(i s lomítkem)</div> */}
            <label htmlFor="birthNumber">{t("birthNumber")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="tShirtSize"
              value={tShirtSize}
              onChange={(item) => setTShirtSize(item.target.value)}
              required
              placeholder="(aktulaní velikost)"
            />
            <label htmlFor="tShirtSize">{t("tShirtSize")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="parentName"
              value={parentName}
              onChange={(item) => setParentName(item.target.value)}
              required
              placeholder="(zákonný zástupce)"
            />
            <label htmlFor="parentName">{t("parentName")}</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="parentPhone"
              value={phone}
              onChange={(item) => setPhone(item.target.value)}
              required
              placeholder="(kontakt na osobu v době tábora)"
            />
            <label htmlFor="parentPhone">{t("parentPhone")}</label>
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
            <textarea
              rows="4"
              type="text"
              className="form-control"
              id="note"
              value={note}
              onChange={(item) => setNote(item.target.value)}
              placeholder={t("note")}
            />
            <label htmlFor="note">{t("note")}</label>
          </div>
          <button className="btn btn-primary" type="submit" disabled={!formIsValid} >{t("preview")}</button>
          {/* <button className="btn btn-primary" onClick={()=>{
            setFirstName("Samuel");
            setLastName("Hase");
            setTShirtSize("XS");
            setBirthNumber("830512/2565");
            setAddress("Dobratice 13, 739 51");
            setParentName("Hasman");
            setPhone("+420 775 106 711");
            setNote("Nejlpeší táta na světe");
            setEmail("michal.hase@email.cz");
          }} >{t("fill")}</button> */}
      </form>
    </div>
    
  );
};

export default SignUpThirdStep;
