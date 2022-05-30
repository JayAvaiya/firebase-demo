import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import style from "./AddUser.module.css";

const AddUser = ({ setAdd }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    age: 0,
    active: true,
    mobileno: "",
  });
  const { addUser, currentUser } = useContext(UserContext);
  const [error, setError] = useState({});

  const [addUserSuccess, setAddUserSuccess] = useState(false);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setError({});
    const userId = Math.floor(100000 + Math.random() * 900000);
    const response = await addUser({ userId, ...userInfo });
    if (response.status === "success") {
      setAddUserSuccess(true);
    } else {
      setError({ userAdditionError: true, message: response.message });
    }
  };

  // useEffect(() => {
  //   if (Object.keys(error).length > 0) {
  //     setError({});
  //   }
  // }, [email, password, confirmPassword]);

  return (
    <div className={style.wrapper}>
      {addUserSuccess ? (
        <>
          <Button variant="outlined" type="submit" className={style.btn} onClick={() => setAdd()}>
            Back
          </Button>
          <div className={style.welcomeText}>{`User ${userInfo.username} Added Successfully`}</div>
          <Button variant="outlined" className={style.button} onClick={() => setAddUserSuccess(false)}>
            Add Another User
          </Button>
        </>
      ) : (
        <form className={style.loginboxwrapper} onSubmit={handleFormSubmission}>
          <Button
            variant="outlined"
            type="submit"
            className={style.btn}
            style={{ alignSelf: "flex-start", marginLeft: "1em" }}
            onClick={() => setAdd()}
          >
            Back
          </Button>
          <div className={style.title}>Add User</div>
          {error.userAdditionError && <p className={style.error}>{error?.message || "Something went wrong!"}</p>}
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={userInfo.username}
            variant="filled"
            size="small"
            required={true}
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            placeholder="Enter Username"
          />
          <div className={style.margin}></div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={userInfo.email}
            variant="filled"
            size="small"
            required={true}
            placeholder="Enter Email"
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
          <div className={style.margin}></div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={userInfo.mobileno}
            variant="filled"
            size="small"
            required={true}
            placeholder="Enter Mobile"
            onChange={(e) => setUserInfo({ ...userInfo, mobileno: e.target.value })}
          />
          <div className={style.margin}></div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={userInfo.age}
            type="number"
            variant="filled"
            size="small"
            required={true}
            placeholder="Enter Age"
            onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
          />
          <div className={style.margin}></div>

          <Button variant="outlined" type="submit" className={style.btn}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddUser;
