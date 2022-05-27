import React from "react";
import style from "./Welcome.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.welcomeText}>Welcome To Firebase Demo</div>
      <Link to="/login" className={style.link}>
        <Button variant="outlined" className={style.button}>
          Login
        </Button>
      </Link>
    </div>
  );
};

export default Welcome;
