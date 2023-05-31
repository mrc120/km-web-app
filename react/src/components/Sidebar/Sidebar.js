import React, { Component, useEffect, useState } from "react";
import { useLocation, NavLink, Link, Route, Switch } from "react-router-dom";
import { Nav } from "react-bootstrap";

const backgroundLogo = require("assets/img/logo-clear-inverted.png")

function Sidebar({ color, image, routes }) {
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
          <a href="/ksiazka" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={backgroundLogo}/>
            </div>
          </a>
          <a className="simple-text" href="/ksiazka">Książka Adresowa</a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (prop.visible) {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.path)
                  }
                  key={key}>
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active">
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            }
            return null
          })
          }
        </Nav>
      </div>
    </div>
  );
}


export default Sidebar;
