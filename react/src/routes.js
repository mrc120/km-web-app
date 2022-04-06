
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Legend from "views/Legend.js";
import Helpdesk from "views/Helpdesk.js";
import ShowList from "views/ShowList.js";
import AddFile from "views/AddFile.js";
import ShowList_zarz from "views/ShowList_zarz.js";
import ShowList_podst from "views/ShowList_podst.js";
import AdminPanel from "views/AdminPanel.js";



const navbarRoutes = [
  {
    path: "/add",
    name: "Dodaj użytkownika",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/u",

  },
  {
    path: "/upload_file",
    name: "Dodaj plik",
    icon: "nc-icon nc-single-copy-04",
    component: AddFile,
    layout: "/u",
  },

  {
    path: "/table",
    name: "Książka",
    icon: "nc-icon nc-badge",
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

  //Plikownia - files
  {
    path: "/uchwaly",
    name: "Uchwały",
    icon: "nc-icon nc-single-copy-04",
    component: ShowList,
    layout: "/u",
  },

  {
    path: "/podstawy_prawne",
    name: "Podstawy prawne",
    icon: "nc-icon nc-tag-content",
    component: ShowList_podst,
    layout: "/u",
  },

  {
    path: "/zarzadzenia",
    name: "Zarządzenia",
    icon: "nc-icon nc-notes",
    component: ShowList_zarz,
    layout: "/u",
  },

  {
    path: "/panel_administracyjny",
    name: "Panel Administracyjny",
    icon: "nc-icon nc-settings-gear-64",
    component: AdminPanel,
    layout: "/u",
  },
];

export default navbarRoutes;

