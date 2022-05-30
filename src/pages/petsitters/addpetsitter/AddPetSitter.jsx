import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PetSitterContext } from "../../../context/PetSitterContext";
import { UserContext } from "../../../context/UserContext";
import style from "./AddPetSitter.module.css";

const AddPetSitter = ({ setAdd }) => {
  const [petSitterInfo, setPetSitterInfo] = useState({
    username: "",
    email: "",
    age: 0,
    active: true,
    verified: false,
    preferredPet: "",
  });
  const { addPetSitter } = useContext(PetSitterContext);
  const [error, setError] = useState({});

  const [addUserSuccess, setAddUserSuccess] = useState(false);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setError({});
    const userId = Math.floor(100000 + Math.random() * 900000);
    const response = await addPetSitter({ userId, ...petSitterInfo });
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
          <div className={style.welcomeText}>{`User ${petSitterInfo.username} Added Successfully`}</div>
          <Button variant="outlined" className={style.button} onClick={() => setAddUserSuccess(false)}>
            Add Another Pet Sitter
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
          <div className={style.title}>Add Pet Sitter</div>
          {error.userAdditionError && <p className={style.error}>{error?.message || "Something went wrong!"}</p>}
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
      )}
    </div>
  );
};

export default AddPetSitter;
