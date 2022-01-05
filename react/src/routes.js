
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Legend from "views/Legend.js";
import Helpdesk from "views/Helpdesk.js";
import ShowList from "views/ShowList.js";
import AddFile from "views/AddFile.js";

const navbarRoutes = [
  {
    path: "/add",
    name: "Dodaj użytkownika",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/u",
    invisible: true,

  },
  {
    path: "/upload_file",
    name: "Dodaj plik",
    icon: "nc-icon nc-single-copy-04",
    component: AddFile,
    layout: "/u",
    invisible: true,
  },

  {
    path: "/table",
    name: "Książka",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/u",

  },
  {
    path: "/legend",
    name: "Legenda",
    icon: "nc-icon nc-bulb-63",
    component: Legend,
    layout: "/u",
  },
  {
    path: "/helpdesk",
    name: "Helpdesk",
    icon: "nc-icon nc-support-17",
    component: Helpdesk,
    layout: "/u",
  },

  {
    path: "/uchwaly",
    name: "Uchwały",
    icon: "nc-icon nc-single-copy-04",
    component: ShowList,
    layout: "/u",
  },
];

export default navbarRoutes;

