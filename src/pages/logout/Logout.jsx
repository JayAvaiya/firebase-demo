import React, { useContext, useEffect, useState } from "react";
import style from "./Logout.module.css";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const [error, setError] = useState({});

  useEffect(() => {
    logout()
      .then(() => {
        localStorage.removeItem("confirmLogin");
        navigate("/login");
      })
      .catch((error) => {
        setError({ logoutError: true });
      });
  }, []);

  return <div className={style.wrapper}>Logging Out...</div>;
};

export default Logout;
