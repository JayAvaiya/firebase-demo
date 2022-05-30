import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useState } from "react";
import { app, database } from "../firebase";
import { set, ref, get, onValue } from "firebase/database";

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

  const listUser = async (callback) => {
    try {
      const userRef = ref(database, `Users/`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
      });
    } catch (error) {
      console.log(error);
      return { status: "unsuccess", message: error.message };
    }
  };

  const deleteUser = async (id) => {
    try {
      await set(ref(database, `Users/${id}`), null);
      return { status: "success", message: "User Deleted Successfully" };
    } catch (error) {
      console.log(error);
      return { status: "unsuccess", message: error.message };
    }
  };

  const editUser = async (userInfo) => {
    try {
      const { id, username, email, mobileno, age, active } = userInfo;
      set(ref(database, `Users/${id}`), {
        username,
        email,
        mobileno,
        age,
        active,
      });
      return { status: "success", message: "User Edited Successfully" };
    } catch (error) {
      return { status: "unsuccess", message: error.message };
    }
  };

  const addUser = async (userInfo) => {
    try {
      const { userId, username, email, mobileno, age, active } = userInfo;
      set(ref(database, `Users/${userId}`), {
        username,
        email,
        mobileno,
        age,
        active,
      });
      return { status: "success", message: "User Added Successfully" };
    } catch (error) {
      return { status: "unsuccess", message: error.message };
    }
  };

  const changeActive = async (userId, checkOrNot) => {
    try {
      set(ref(database, `Users/${userId}/active`), checkOrNot);
      return { status: "success", message: "Status Changed Successfully" };
    } catch (error) {
      return { status: "unsuccess", message: error.message };
    }
  };

  const countUsers = async (callback) => {
    try {
      const userRef = ref(database, `Users/`);
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

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      return { status: "unsuccess", message: error.message };
    }
  };

  const value = {
    signUpUser,
    loginUser,
    currentUser,
    addUser,
    listUser,
    deleteUser,
    editUser,
    changeActive,
    countUsers,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
