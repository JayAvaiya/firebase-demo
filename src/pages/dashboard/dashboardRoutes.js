import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import LogoutIcon from "@mui/icons-material/Logout";

import DashboardScreen from "./DashboardScreen";
import ListUser from "../users/listuser/ListUser";
import ListPetSitter from "../petsitters/listpetsitter/ListPetSitter";
import Logout from "../logout/Logout";

const routes = [
  {
    tag: "DASHBOARD",
    icon: DashboardIcon,
    component: DashboardScreen,
    text: "Dashboard",
  },
  {
    tag: "USERS",
    icon: GroupIcon,
    component: ListUser,
    text: "Users",
  },
  {
    tag: "PETSITTER",
    icon: BabyChangingStationIcon,
    component: ListPetSitter,
    text: "Pet Sitter",
  },
  {
    tag: "LOGOUT",
    icon: LogoutIcon,
    component: Logout,
    text: "Logout",
  },
];

export default routes;
