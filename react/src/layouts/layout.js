import React, { useState, useRef, useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "../routes";

import sidebarImage from "assets/img/loglclr.png";

function Layout() {
  const [image] = useState(sidebarImage);
  const [color] = useState("azure");
  const location = useLocation();
  const mainPanel = useRef(null);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {

      return (
        <Route
          path={prop.path}
          render={(props) => <prop.component {...props} />}
          key={key} 
        />
      );

  });
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={image} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <Switch>{getRoutes(routes)}</Switch>
          <Footer />
        </div>
      </div>
    </>
  );
}
export default Layout;
