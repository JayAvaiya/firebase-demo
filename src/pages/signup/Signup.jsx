import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import style from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUpUser } = useContext(UserContext);
  const [error, setError] = useState({});

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setError({});
    if (password.trim() !== confirmPassword.trim()) {
      setError({ passwordMisMatch: true });
      return;
    }
    const response = await signUpUser(email, password);
    if (response.status === "success") {
      setSignUpSuccess(true);
    } else {
      setError({ signUpError: true, message: response.message });
    }
  };

  useEffect(() => {
    if (Object.keys(error).length > 0) {
      setError({});
    }
  }, [email, password, confirmPassword]);

  return (
    <div className={style.wrapper}>
      {signUpSuccess ? (
        <>
          <div className={style.welcomeText}>Signup Successful, You can Login Now</div>
          <Link to="/login" className={style.link}>
            <Button variant="outlined" className={style.button}>
              Login
            </Button>
          </Link>
        </>
      ) : (
        <form className={style.loginboxwrapper} onSubmit={handleFormSubmission}>
          <div className={style.title}>Sign Up</div>
          {error.signUpError && <p className={style.error}>{error?.message || "Something went wrong!"}</p>}
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={email}
            variant="filled"
            size="small"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <div className={style.margin}></div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={password}
            variant="filled"
            size="small"
            required={true}
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={style.margin}></div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={confirmPassword}
            variant="filled"
            size="small"
            type="password"
            required={true}
            placeholder="Enter Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error.passwordMisMatch && <p className={style.error}>Password and Confirm password didn't match</p>}
          <div className={style.margin}></div>
          <Button variant="outlined" type="submit" className={style.btn}>
            Submit
          </Button>
          <div className={style.bottomText}>
            Already have an account then{" "}
            <Link className={style.link} to="/login">
              Login
            </Link>{" "}
            here.{" "}
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
