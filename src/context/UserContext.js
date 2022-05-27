import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useState } from "react";
import { app } from "../firebase";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState("");

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(email);
      return { status: "success", message: "User Created Successfully" };
    } catch (error) {
      return { status: "unsuccess", message: error.message };
    }
  };

  const signUpUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { status: "success", message: "User Created Successfully" };
    } catch (error) {
      return { status: "unsuccess", message: error.message };
    }
  };
  const value = { signUpUser, loginUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
