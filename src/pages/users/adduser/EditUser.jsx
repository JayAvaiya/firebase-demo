import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import style from "./AddUser.module.css";

const EditUser = ({ selectedUser, changeEdit }) => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    email: "",
    age: 0,
    active: true,
    mobileno: "",
  });
  const { editUser } = useContext(UserContext);
  const [error, setError] = useState({});

  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    const { id, active, age, email, mobileno, username } = selectedUser;
    setUserInfo(() => {
      return { username, mobileno, email, age, active, id };
    });
  }, []);

  console.log(userInfo);
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setError({});
    const response = await editUser(userInfo);
    if (response.status === "success") {
      setEditSuccess(true);
    }
    if (response.status === "unsuccess") {
      setError({ editError: true, message: response.message });
    }
  };

  useEffect(() => {
    if (editSuccess) {
      changeEdit(userInfo.username);
    }
  }, [editSuccess]);

  return (
    <>
      <div className={style.wrapper}>
        <form className={style.loginboxwrapper} onSubmit={handleFormSubmission}>
          <Button
            variant="outlined"
            type="submit"
            className={style.btn}
            style={{ alignSelf: "flex-start", marginLeft: "1em" }}
            onClick={() => changeEdit()}
          >
            Back
          </Button>
          <div className={style.title}>Edit User</div>
          {error.editError && <p className={style.error}>{error?.message || "Something went wrong!"}</p>}
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
      </div>
    </>
  );
};

export default EditUser;
