import AddUser from "./adduser/AddUser";
import ListUser from "./listuser/ListUser";

import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
// import AddPetSitter from "./petsitter/addpetsitter/AddPetSitter";

const routes = [
  {
    tag: "addUser",
    component: AddUser,
    text: "Add User",
    icon: AddIcon,
  },
  {
    tag: "listUsers",
    component: ListUser,
    text: "List Users",
    icon: ListIcon,
  },
  // {
  //   tag: "addPetSitter",
  //   component: AddPetSitter,
  //   text: "Add Pet Sitter",
  //   icon: AddIcon,
  // },
];

export default routes;
