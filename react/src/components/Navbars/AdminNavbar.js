
import React, { useRef,useEffect, useState } from "react";
import { useLocation, Switch, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav, Button, Modal, Table } from "react-bootstrap";
import routes from "routes.js";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service.js";

import BoardUser from "../../components/BoardUser";
import Profile from "components/Profile.js";

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
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };


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
          //props.history.push("/table");
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
      <Container fluid>

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
      <nav className="navbar navbar-expand navbar-dark bg-dark">
       
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>


          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )} */}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Profile} />
          {/* //<Route exact path="/login" component={Login} />
         // <Route exact path="/register" component={Register} />
          //<Route exact path="/profile" component={Profile} />
          //<Route path="/user" component={BoardUser} />
          /<Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} /> */}
        </Switch>
      </div>
    </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
          </Nav>

          <Nav navbar>
            <Nav.Item>
              <Button
                className="btn-wd-l"
                href="#login"
                variant="info"
                onClick={() => setShowModal(true)}>
                <span className="no-icon">Logowanie</span>
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>


      {/* Mini Modal */}
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

          <Form onSubmit={handleLogin} ref={form}>
            <label htmlFor="email">E-mail:</label>
            <Input
              type="text"
              className="marbot"
              value={email}
              name="email"
              placeholder="Adres e-mail"
              onChange={onChangeUsername}
              validations={[required]}
            />

            <label htmlFor="password">Hasło:</label>
            <Input
              placeholder="********"
              name="password"
              className="marbot"
              type="password"
              onChange={onChangePassword}
              validations={[required]}
            />


            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>


        </Modal.Body>

      </Modal>
    </Navbar >
  );
}

export default AdminNavbar;
