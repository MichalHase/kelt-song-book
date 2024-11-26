import React, { useState } from "react";
import classes from "./InputText.module.css";

const InputText = React.forwardRef((props, ref) => {
  const [isValid, setIsValid] = useState(true);

  const validateHandler = () => {
    const enteredText = ref.current.value;

    if (enteredText.trim().length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className={`${classes.inputText} ${!isValid && classes.invalid}`}>
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

export default InputText;
