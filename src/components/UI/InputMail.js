import React, { useState } from "react";
import classes from "./InputMail.module.css";

const InputMail = React.forwardRef((props, ref) => {
  //const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);

  const onChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
  };
  const validateEmailHandler = () => {
    const enteredEmail = ref.current.value;
    setEmailIsValid(enteredEmail.includes("@"));
  };

  return (
    <div className={`${classes.inputMail} ${!emailIsValid && classes.invalid}`}>
      <label htmlFor={props.id}>
        {props.label} <i>{props.description}</i>
      </label>
      <input
        type="email"
        label={props.label}
        id={props.id}
        ref={ref}
        onChange={onChangeHandler}
        onBlur={validateEmailHandler}
      />
    </div>
  );
});

export default InputMail;
