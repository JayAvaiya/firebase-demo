import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PetSitterContext } from "../../../context/PetSitterContext";
import { UserContext } from "../../../context/UserContext";
import style from "./AddPetSitter.module.css";

const EditUser = ({ selectedUser, changeEdit }) => {
  const [petSitterInfo, setPetSitterInfo] = useState({
    id: "",
    username: "",
    email: "",
    active: true,
    verified: false,
    preferredPet: "",
  });
  const { editPetSitter } = useContext(PetSitterContext);
  const [error, setError] = useState({});

  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    const { id, active, verified, preferredPet, email, mobileno, username } = selectedUser;
    setPetSitterInfo(() => {
      return { id, active, verified, preferredPet, email, mobileno, username };
    });
  }, []);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setError({});
    const response = await editPetSitter(petSitterInfo);
    if (response.status === "success") {
      setEditSuccess(true);
    }
    if (response.status === "unsuccess") {
      setError({ editError: true, message: response.message });
    }
  };

  useEffect(() => {
    if (editSuccess) {
      changeEdit(petSitterInfo.username);
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
            value={petSitterInfo.username}
            variant="filled"
            size="small"
            required={true}
            onChange={(e) => setPetSitterInfo({ ...petSitterInfo, username: e.target.value })}
            placeholder="Enter Username"
          />
          <div className={style.margin}></div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={petSitterInfo.email}
            variant="filled"
            size="small"
            required={true}
            placeholder="Enter Email"
            onChange={(e) => setPetSitterInfo({ ...petSitterInfo, email: e.target.value })}
          />
          <div className={style.margin}></div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={petSitterInfo.mobileno}
            variant="filled"
            size="small"
            required={true}
            placeholder="Enter Mobile"
            onChange={(e) => setPetSitterInfo({ ...petSitterInfo, mobileno: e.target.value })}
          />
          <div className={style.margin}></div>
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            className={style.field}
            value={petSitterInfo.preferredPet}
            variant="filled"
            size="small"
            required={true}
            placeholder="Preferred Pet"
            onChange={(e) => setPetSitterInfo({ ...petSitterInfo, preferredPet: e.target.value })}
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
