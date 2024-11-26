import React, { useState } from "react";
import classes from "./InputAge.module.css";

const InputAge = React.forwardRef((props, ref) => {
  const [isValid, setIsValid] = useState(true);

  const validateHandler = () => {
    const enteredAge = ref.current.value;

    if (enteredAge.trim().length === 11 && enteredAge.includes("/")) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className={`${classes.inputAge} ${!isValid && classes.invalid}`}>
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

export default InputAge;