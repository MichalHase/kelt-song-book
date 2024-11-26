import React, { useState } from "react";
import classes from "./InputPhone.module.css";

const InputPhone = React.forwardRef((props, ref) => {
  const [isValid, setIsValid] = useState(true);

  const validateHandler = () => {
    const enteredPhone = ref.current.value;

    if (enteredPhone.trim().length === 13 && enteredPhone.includes("+")) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className={`${classes.inputPhone} ${!isValid && classes.invalid}`}>
      <label htmlFor={props.id}>
        {props.label} <i>{props.description}</i>
      </label>
      <input
        type="text"
        label={props.label}
        id={props.id}
        ref={ref}
        onBlur={validateHandler}
      />
    </div>
  );
});

export default InputPhone;
