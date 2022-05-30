import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { UserContext } from "../../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "../addpetsitter/EditPetSitter";
import AddUser from "../addpetsitter/AddPetSitter";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Button, Dialog } from "@mui/material";

import style from "./ListPetSitter.module.css";
import { PetSitterContext } from "../../../context/PetSitterContext";

const ListPetSitter = () => {
  const { listPetSitters, deletePetSitter, changeActive, changeVerified } = useContext(PetSitterContext);
  const [error, setError] = useState({});
  const [petSitterList, setPetSitterList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [add, setAdd] = useState(false);

  useEffect(() => {
    listPetSitters((petSitterList) => {
      if (petSitterList) {
        const userIds = Object.keys(petSitterList);
        let finalUserList = [];
        userIds.map((id) => {
          const currentObj = petSitterList[id];
          finalUserList = [...finalUserList, { id, ...currentObj }];
        });
        setPetSitterList(Object.values(finalUserList));
      } else {
        setError({ DataFetchingError: true });
      }
    });
  }, []);

  const deleteRecord = async (id) => {
    const response = await deletePetSitter(id);
    if (response.status === "success") {
      setPetSitterList(petSitterList.filter((item) => item.id !== id));
      toast.success(response.message);
    }
    if (response.status === "unsuccess") {
      setError({ deletionError: true, message: response.message });
      toast.error(response.message);
    }
  };

  const editRecord = (id) => {
    setSelectedUser(() => {
      return petSitterList.filter((item) => item.id === id)[0];
    });
  };

  useEffect(() => {
    if (Object.keys(selectedUser).length > 0) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [selectedUser]);

  const changeEdit = (username) => {
    toast.success("User Edited Successfully");
    setEdit(false);
  };

  return edit ? (
    <EditUser selectedUser={selectedUser} changeEdit={changeEdit} />
  ) : add ? (
    <AddUser setAdd={setAdd} />
  ) : (
    <>
      <div className={style.btnRight}>
        <Button variant="outlined" type="submit" className={style.btn} onClick={() => setAdd(true)}>
          Add PetSitter
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">MobileNo</TableCell>
              <TableCell align="right">Preferred Pet</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Verified</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {petSitterList.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.mobileno}</TableCell>
                <TableCell align="right">{row.preferredPet}</TableCell>
                <TableCell align="right">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <FormGroup>
                      <Switch
                        checked={row.active}
                        onChange={async (e) => {
                          const response = await changeActive(row.id, e.target.checked);
                          if (response.status === "success") {
                            toast.success(response.message);
                          }
                          if (response.status === "unsuccess") {
                            toast.error(response.message);
                          }
                          setPetSitterList(
                            petSitterList.map((item) =>
                              item.id === row.id ? { ...item, active: e.target.checked } : item
                            )
                          );
                        }}
                      />
                    </FormGroup>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <FormGroup>
                      <Switch
                        checked={row.verified}
                        onChange={async (e) => {
                          const response = await changeVerified(row.id, e.target.checked);
                          if (response.status === "success") {
                            toast.success(response.message);
                          }
                          if (response.status === "unsuccess") {
                            toast.error(response.message);
                          }
                          setPetSitterList(
                            petSitterList.map((item) =>
                              item.id === row.id ? { ...item, verified: e.target.checked } : item
                            )
                          );
                        }}
                      />
                    </FormGroup>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div onClick={() => editRecord(row.id)}>
                      <EditIcon />
                    </div>
                    <div onClick={() => deleteRecord(row.id)}>
                      <DeleteIcon />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ToastContainer />
      </TableContainer>
    </>
  );
};

export default ListPetSitter;
