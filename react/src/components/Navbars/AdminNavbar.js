
import React, { useRef, useEffect, useState } from "react";
import { useLocation, Switch, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav, Button, Modal, } from "react-bootstrap";
import routes from "routes.js";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service.js";
import Table from "../../views/TableList.js";
import UserProfile from "../../views/UserProfile.js";
import ShowList from "../../views/ShowList.js";

const AdminNavbar = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [showModal, setShowModal] = React.useState(false);
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Te pole jest wymagane!
        </div>
      );
    }
  };

  const onChangeUsername = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          //props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  //odpala hamburgera na ekranach mobilnych
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  //pobiera tekst wyswietlany w rogu routesa
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Okno";
  };

  return (
    <Navbar bg="light" expand="lg">


      <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
        <Button
          variant="dark"
          className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
          onClick={mobileSidebarToggle}
        >
          <i className="fas fa-ellipsis-v"></i>
        </Button>
        <Navbar.Brand
          href="#home"
          onClick={(e) => e.preventDefault()}
          className="mr-2">
          {getBrandText()}
        </Navbar.Brand>
      </div>
      <div>
        <div>
          <div className="navbar-nav mr-auto">
          </div>
          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={Table} />
              <Route exact path="/add" component={UserProfile} />
              <Route exact path="/add_document" component={ShowList} />
            </Switch>
          </div>
        </div>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav mr-auto" navbar>
        </Nav>
        <Nav navbar>
        <Nav.Item>
            {showAdminBoard && (
                <Button 
                  className="btn-primary"
                  variant="success"
                  href="/u/add_document">
                    Dodaj uchwałę
                </Button>
              )}
          </Nav.Item>
          <Nav.Item>
            {showAdminBoard && (
                <Button 
                  className="btn-danger"
                  variant="info"
                  href="/u/add">
                    Dodaj nowego użytkownika
                </Button>
              )}
          </Nav.Item>
        <Nav.Item>
          {currentUser ? (
            <Button
              className="btn-wd-l"
              href="/table"
              variant="info"
              onClick={logOut}>
              <span className="no-icon">Wyloguj</span>
            </Button>
          ) : (
            <Button
              className=""
              href="#login" className="btn-wd-l"
              onClick={() => setShowModal(true)}>
              <span className="no-icon">Logowanie</span>
            </Button>
          )}
        </Nav.Item>
        </Nav>
      </Navbar.Collapse>

     
  <Modal
    className="modal-mini modal-primary"
    show={showModal}
    onHide={() => setShowModal(false)}>
    <Modal.Header className="justify-content-center">
      <img src={require("assets/img/logokmclear.png").default}
        width="62px" height="38px" />
      <h3 className="modal-title">Zaloguj się</h3>
    </Modal.Header>
    <Modal.Body>
      <div className="autocenter">
        <Form onSubmit={handleLogin} ref={form}>
          <div className="left">
            <label className="email">E-mail:</label>
          </div>
          <Input
            type="text"
            className="marbot borderidea"
            value={email}
            name="email"
            placeholder="Adres e-mail"
            onChange={onChangeUsername}
            validations={[required]}
          />
          <div className="left">
            <label htmlFor="password">Hasło:</label>
          </div>
          <Input
            placeholder="********"
            name="password"
            className="marbot borderidea"
            type="password"
            onChange={onChangePassword}
            validations={[required]}
          />
          <div className="btn-wd-2 form-group ">
            <button className="btn-fill btn btn-info btn-group btn-modal-login" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm "></span>
              )}
              <span>Zaloguj</span>
            </button>
          </div>
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <Button
          className="btn-simple2"
          type="button"
          variant="link"
          onClick={() => setShowModal(false)}>
          Zamknij
        </Button>
      </div>
    </Modal.Body>
  </Modal>
    </Navbar >
  );
}

export default AdminNavbar;
