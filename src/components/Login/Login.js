import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
const inputHandlers = {
  INPUT_HANDLER: "INPUT_HANDLER",
  INPUT_BLUR: "INPUT_BLUR",
  ENTERED_PASSWORD: "ENTERED_PASSWORD",
  VALID_PASSWORD: "VALID_PASSWORD",
  FORM_VALIDATE: "FORM_VALIDATE",
};
const configureEmail = (state, action) => {
  if (action.type == inputHandlers.INPUT_HANDLER) {
    return {
      ...state,
      value: action.value,
      isValid: action.value.includes("@"),
    };
  } else if (action.type == inputHandlers.INPUT_BLUR) {
    return {
      ...state,
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }else if(action.type==inputHandlers.ENTERED_PASSWORD){
    return{
      ...state,
      password:action.value,
      // validPassword:action.value.trim().length>6

    }
  }else if(action.type==inputHandlers.VALID_PASSWORD){
    return{
      ...state,
      validPassword:action.value.trim().length>6
    }
  }else if(action.type==inputHandlers.FORM_VALIDATE){
    return{
      ...state,
      formValid:state.isValid && state.validPassword
    }
  }
  return { ...state };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);
  const [emialState, dispatchEmail] = useReducer(configureEmail, {
    value: "",
    isValid: null,
    password: "",
    validPassword: false,
    formValid: false,
  });
  // const [state, dispatch] = useReducer(first, second, third)
  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({
      type: inputHandlers.INPUT_HANDLER,
      value: event.target.value,
    });

    // setFormIsValid(emialState.isValid && enteredPassword.trim().length > 6);
    dispatchEmail({
      type:inputHandlers.FORM_VALIDATE
    })
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchEmail({

      type:inputHandlers.ENTERED_PASSWORD,
      value:event.target.value
    });

    // setFormIsValid(emialState.isValid && event.target.value.trim().length > 6);
    dispatchEmail({
      type:inputHandlers.FORM_VALIDATE
    })
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: inputHandlers.INPUT_BLUR,
    });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchEmail({
      type:inputHandlers.VALID_PASSWORD
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emialState.value, emialState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emialState.value === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emialState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            emialState.password === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={emialState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!emialState.formValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
