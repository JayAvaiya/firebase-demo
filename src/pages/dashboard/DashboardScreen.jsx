import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { UserContext } from "../../context/UserContext";
import { PetSitterContext } from "../../context/PetSitterContext";

import style from "./DashboardScreen.module.css";

const DashboardScreen = () => {
  const { countUsers } = useContext(UserContext);
  const { countPetSitters } = useContext(PetSitterContext);
  const [countData, setCountData] = useState({
    userCount: 0,
    petSitterCount: 0,
  });

  useEffect(() => {
    countUsers((userCount) => {
      countPetSitters((petSitterCount) => {
        setCountData(() => ({ userCount, petSitterCount }));
      });
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "48%",
          height: 200,
        },
      }}
    >
      <Paper elevation={3} className={style.paperStyle}>
        <div className={style.title}>Total Users</div>
        <div>{countData.userCount}</div>
      </Paper>
      <Paper elevation={3} className={style.paperStyle}>
        <div className={style.title}>Total Pet Sitters</div>
        <div>{countData.petSitterCount}</div>
      </Paper>
    </Box>
  );
};

export default DashboardScreen;
