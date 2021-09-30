import React, { Component, useEffect, useState } from "react";
import { useLocation, NavLink, Link, Route, Switch } from "react-router-dom";
import { Nav } from "react-bootstrap";
import AuthService from "../../services/auth.service.js";
import UserProfile from "views/UserProfile.js";


function Sidebar({ color, image, routes }) {

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    loggedUser();

  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const loggedUser = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="/table"
            className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={require("assets/img/logo-clear-inverted.png").default}
              />
            </div>
          </a>
          <a className="simple-text" href="/table">
            Książka Adresowa
          </a>
        </div>
        <Nav>
        {/* <Switch>
        {showAdminBoard && (
            <li className="nav-item">
              <Route path="u/add"
               component={UserProfile}
               className="nav-link">
                Dodawanie pracownika
              </Route>
            </li>
          )}
      </Switch> */}
        {routes.map((prop, key) => {
            if(prop.invisible) return null;
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>

                </li>
              );

            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}


export default Sidebar;
