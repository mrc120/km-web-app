
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";


const navbarRoutes = [
  {
    path: "/user",
    name: "Dodaj użytkownika",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  
  },
  {
    path: "/table",
    name: "Książka",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
];

export default navbarRoutes;
