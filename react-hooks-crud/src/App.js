import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddEmployee from "./components/AddEmployee";
import Ksiazka from "./components/Ksiazka";
import KsiazkaList from "./components/KsiazkaList";
import KsiazkaTable from "./components/KsiazkaTable";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/ksiazka" className="navbar-brand">
          KM Plock
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/ksiazka"} className="nav-link">
              Ksiazka
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Dodaj
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/table"} className="nav-link">
              Ksiązka adresowa
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/ksiazka"]} component={KsiazkaList} />
          <Route exact path="/add" component={AddEmployee} />
          <Route path="/ksiazka/:id" component={Ksiazka} />
          <Route exact path="/table" component={KsiazkaTable} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
