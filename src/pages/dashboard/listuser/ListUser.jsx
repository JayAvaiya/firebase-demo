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
import EditUser from "../adduser/EditUser";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ListUser = () => {
  const { listUser, deleteUser, changeActive } = useContext(UserContext);
  const [error, setError] = useState({});
  const [userList, setUserList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    listUser((userList) => {
      if (userList) {
        const userIds = Object.keys(userList);
        let finalUserList = [];
        userIds.map((id) => {
          const currentObj = userList[id];
          finalUserList = [...finalUserList, { id, ...currentObj }];
        });
        setUserList(Object.values(finalUserList));
      } else {
        setError({ DataFetchingError: true });
      }
    });
  }, []);

  const deleteRecord = async (id) => {
    const response = await deleteUser(id);
    if (response.status === "success") {
      setUserList(userList.filter((item) => item.id !== id));
      toast.success(response.message);
    }
    if (response.status === "unsuccess") {
      setError({ deletionError: true, message: response.message });
      toast.error(response.message);
    }
  };

  const editRecord = (id) => {
    setSelectedUser(() => {
      return userList.filter((item) => item.id === id)[0];
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
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">MobileNo</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.mobileno}</TableCell>
              <TableCell align="right">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <FormGroup>
                    <Switch
                      checked={row.active}
                      onChange={(e) => {
                        changeActive(row.id, e.target.checked);
                        setUserList(
                          userList.map((item) => (item.id === row.id ? { ...item, active: e.target.checked } : item))
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
  );
};

export default ListUser;
