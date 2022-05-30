import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import style from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(UserContext);
  const [error, setError] = useState({});

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setError({});
    const response = await loginUser(email, password);
    if (response.status === "success") {
      localStorage.setItem("confirmLogin", true);
      navigate("/dashboard");
    } else {
      setError({ LoginError: true, message: response.message });
    }
  };

  useEffect(() => {
    if (Object.keys(error).length > 0) {
      setError({});
    }
  }, [email, password]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("confirmLogin");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={style.wrapper}>
      <form className={style.loginboxwrapper} autocomplete="off" onSubmit={handleFormSubmission}>
        <div className={style.title}>Login</div>
        {error.LoginError && <p className={style.error}>{error?.message || "Something went wrong!"}</p>}
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          className={style.field}
          value={email}
          variant="filled"
          autocomplete="off"
          size="small"
          required={true}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={style.margin}></div>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          className={style.field}
          value={password}
          autocomplete="off"
          variant="filled"
          size="small"
          type="password"
          required={true}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={style.margin}></div>
        <Button variant="outlined" type="submit" className={style.btn}>
          Submit
        </Button>
        <div className={style.bottomText}>
          Don't have Account then{" "}
          <Link className={style.link} to="/signup">
            Sign Up
          </Link>{" "}
          here.{" "}
        </div>
      </form>
    </div>
  );
};

export default Login;
