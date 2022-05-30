import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useState } from "react";
import { app, database } from "../firebase";
import { set, ref, get, onValue } from "firebase/database";

export const PetSitterContext = createContext();

const PetSitterContextProvider = ({ children }) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState("");

  const listPetSitters = async (callback) => {
    try {
      const userRef = ref(database, `Petsitter/`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
      });
    } catch (error) {
      console.log(error);
      return { status: "unsuccess", message: error.message };
    }
  };

  const deletePetSitter = async (id) => {
    try {
      await set(ref(database, `Petsitter/${id}`), null);
      return { status: "success", message: "User Deleted Successfully" };
    } catch (error) {
      console.log(error);
      return { status: "unsuccess", message: error.message };
    }
  };

  const editPetSitter = async (userInfo) => {
    try {
      const { id, active, verified, preferredPet, email, mobileno, username } = userInfo;
      set(ref(database, `Petsitter/${id}`), {
        active,
        verified,
        preferredPet,
        email,
        mobileno,
        username,
      });
      return { status: "success", message: "User Edited Successfully" };
    } catch (error) {
      return { status: "unsuccess", message: error.message };
    }
  };

  const addPetSitter = async (userInfo) => {
    try {
      const { userId, username, email, mobileno, active, verified, preferredPet } = userInfo;
      set(ref(database, `Petsitter/${userId}`), {
        username,
        email,
        mobileno,
        verified,
        active,
        preferredPet,
      });
      return { status: "success", message: "User Added Successfully" };
    } catch (error) {
      return { status: "unsuccess", message: error.message };
    }
  };

  const changeActive = async (userId, checkOrNot) => {
    try {
      set(ref(database, `Petsitter/${userId}/active`), checkOrNot);
      return { status: "success", message: "Status Changed Successfully" };
    } catch (error) {
      return { status: "unsuccess", message: error.message };
    }
  };

  const changeVerified = async (userId, checkOrNot) => {
    try {
      set(ref(database, `Petsitter/${userId}/verified`), checkOrNot);
      return { status: "success", message: "Status Changed Successfully" };
    } catch (error) {
      return { status: "unsuccess", message: error.message };
    }
  };

  const countPetSitters = async (callback) => {
    try {
      const userRef = ref(database, `Petsitter/`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        const count = Object.keys(data).length;
        callback(count);
      });
    } catch (error) {
      console.log(error);
      return { status: "unsuccess", message: error.message };
    }
  };

  const value = {
    listPetSitters,
    editPetSitter,
    addPetSitter,
    changeActive,
    deletePetSitter,
    changeVerified,
    countPetSitters,
  };
  return <PetSitterContext.Provider value={value}>{children}</PetSitterContext.Provider>;
};

export default PetSitterContextProvider;
