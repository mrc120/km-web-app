
import React, { useRef, useEffect, useState } from "react";
import { useLocation, Switch, Route, Link } from "react-router-dom";
import { Navbar, Row, Nav, Button, Modal, } from "react-bootstrap";
import routes from "routes.js";

import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service.js";




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
  const [showFileUploadBoard, setFileUploadBoard] = useState(false);
  const [showAddUserBoard, setAddUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);


  // const twoCalls = user => {
  //   showAdminBoard
  //   showFileUploadBoard
  // }
  useEffect(() => {
    loggedUser();
    activeRole();


  }, []);

  const logOut = () => {
    AuthService.logout();
  };


  const loggedUser = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setFileUploadBoard(user.roles.includes("ROLE_ADD_FILE"));
      setAddUserBoard(user.roles.includes("ROLE_ADD_USER"));
    }
  }
  const activeRole = () => {
    const user = AuthService.getCurrentUser();
  }

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Wszystkie pola są wymagane!
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
          onClick={mobileSidebarToggle} >
          <i className="fas fa-ellipsis-v"></i>
        </Button>
        <Navbar.Brand
          onClick={(e) => e.preventDefault()}
          className="mr-2">
          {getBrandText()}
        </Navbar.Brand>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="out-box"></div>
        <Nav className="nav mr-auto " navbar>
        </Nav>
        <Nav nav className="static-hold">
         
          <Nav.Item>
            {showAdminBoard &&
              <Button
                title="Admin"
                className="btn-nav d-flex "
                variant="info"
                href="/u/panel_administracyjny">
                <i class="nc-icon nc-settings-gear-64 size-up"></i>
              </Button>
            }
          </Nav.Item>
          <Nav.Item>
            {(showFileUploadBoard || showAdminBoard) &&
              <Button
                title="Dodaj nowy plik"
                className="btn-nav d-inline-flex"
                variant="danger"
                href="/u/upload_file">
                 <div className="mr-1">Dodaj plik</div>
                <i class="nc-icon nc-cloud-upload-94 size-up"></i>
              </Button>

            }
          </Nav.Item>
          <Nav.Item>
            {(showAdminBoard || showAddUserBoard) &&
              <Button
                title="Dodaj nowego pracownika"
                className="btn-nav d-inline-flex"
                variant="success"
                href="/u/add">
                <div className="mr-1 ">Dodaj +</div>
                <div className="nc-icon nc-circle-09 size-up"></div>

              </Button>
            }
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
                className="btn-wd-l"
                href="#login"
                onClick={() => setShowModal(true)}>
                <span className="no-icon">Logowanie</span>
              </Button>
            )}
          </Nav.Item>
          
        </Nav>
      </Navbar.Collapse>

      {/* //MODAL Login page */}
      <Modal
        className="modal-mini modal-primary"
        show={showModal}
        onHide={() => setShowModal(false)}>
        <Modal.Header className="justify-content-center">
          <img className="mt-2" src={require("assets/img/logokmclear.png").default}
            width="100px" height="60px" />
          <h2 className="mt-3 ml-3">Zaloguj się</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="autocenter">
            <Form onSubmit={handleLogin} ref={form}>
              <div className="left">
                <label className="email">E-mail:</label>
              </div>
              <Input
                type="string"
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
              {message && (
                <div className="alert alert-danger " role="alert">
                  {message}
                </div>
              )}
              <div className="btn-wd-2 form-group ">
                <button className="btn-fill btn btn-info btn-group btn-modal-login" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm "></span>
                  )}
                  <span>Logowanie</span>
                </button>
              </div>
              <CheckButton className="mt-2" style={{ display: "none" }} ref={checkBtn} />
            </Form>
            <Button
              className="btn-simple2 mt-3"
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
