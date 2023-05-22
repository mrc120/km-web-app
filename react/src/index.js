
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

import LayoutPanel from "./layouts/panel";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/u"
        render={(props) =>
          <LayoutPanel {...props} />} />
      <Redirect from="/" to="/u/ksiazka" />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);
