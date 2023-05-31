import TableList from "views/TableList/TableList";
import AddUser from "views/Authorized/AddUser.js";
import AddFile from "views/Authorized/AddFile.js";
import AdminPanel from "views/Authorized/AdminPanel/AdminPanel.js";

import ShowList_uchw from "views/Showlists/ShowList_uchw.js";
import ShowList_zarz from "views/Showlists/ShowList_zarz.js";
import ShowList_podst from "views/Showlists/ShowList_podst.js";

import Legend from "views/Static/Legend.js";
import Helpdesk from "views/Static/Helpdesk.js";
import KnowledgeHelpdesk from "views/Static/KnowledgeHelpdesk";


const routes = [
  {
    path: "/add",
    name: "Dodaj użytkownika",
    icon: "nc-icon nc-circle-09",
    component: AddUser,
  },
  {
    path: "/upload_file",
    name: "Dodaj plik",
    icon: "nc-icon nc-single-copy-04",
    component: AddFile,
  },
  {
    path: "/ksiazka",
    name: "Książka",
    icon: "nc-icon nc-badge",
    component: TableList,
    visible: true
  },
  {
    path: "/uchwaly",
    name: "Uchwały",
    icon: "nc-icon nc-single-copy-04",
    component: ShowList_uchw,
    visible: true
  },
  {
    path: "/zarzadzenia",
    name: "Zarządzenia",
    icon: "nc-icon nc-notes",
    component: ShowList_zarz,
    visible: true
  },
  {
    path: "/podstawy_prawne",
    name: "Podstawy Prawne",
    icon: "nc-icon nc-tag-content",
    component: ShowList_podst,
    visible: true
  },
  {
    path: "/panel_administracyjny",
    name: "Panel Administracyjny",
    icon: "nc-icon nc-settings-gear-64",
    component: AdminPanel,
    visible: false
  },
  {
    path: "/legend",
    name: "Legenda",
    icon: "nc-icon nc-bulb-63",
    component: Legend,
    visible: true
  },
  {
    path: "/helpdesk",
    name: "Helpdesk",
    icon: "nc-icon nc-support-17",
    component: Helpdesk,
    visible: true
  },
  {
    path: "/knowledgeCenter",
    name: "Baza wiedzy",
    icon: "nc-icon nc-single-copy-04",
    component: KnowledgeHelpdesk,
    visible: true
  },
];

export default routes;

