import React from "react";
import { useLocation,} from "react-router-dom";
import { Navbar, Nav, Button} from "react-bootstrap";
import routes from "routes.js";

import LoginModal from "../Modal/LoginModal.js"

import useToggle from "../../hooks/useToggle.js"
import useAuth from "../../hooks/useAuth.js"

const AdminNavbar = () => {
  const { showAdminBoard, showAddUserBoard, showFileUploadBoard,
    currentUser, logOut } = useAuth();
  const location = useLocation();
  
  const [showModal, setShowModal] = useToggle(false);

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

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].path) !== -1) {
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
        <Nav className="nav mx-auto" style={{ width: "80px" }} >
        </Nav>
        <Nav nav className="static-hold">
          <Nav.Item>
            {(showAdminBoard || showFileUploadBoard) &&
              <Button
                title="Dodaj nowy plik"
                className="btn-nav d-inline-flex"
                variant="success"
                href="/upload_file">
                <div className="mr-1">Dodaj plik</div>
                <i className="nc-icon nc-cloud-upload-94 size-up"></i>
              </Button>
            }
          </Nav.Item>
          <Nav.Item>
            {(showAdminBoard || showAddUserBoard) &&
              <Button
                title="Dodaj nowego pracownika"
                className="btn d-inline-flex"
                variant="success"
                href="/add">
                <div className="mr-1 ">Dodaj +</div>
                <div className="nc-icon nc-circle-09 size-up"></div>
              </Button>
            }
          </Nav.Item>
          <Nav.Item>
            {showAdminBoard &&
              <Button
                title="Admin"
                className="btn-nav d-flex"
                href="/panel_administracyjny">
                <i className="nc-icon nc-settings-gear-64 size-up"></i>
              </Button>
            }
          </Nav.Item>
          <Nav.Item>
            {currentUser ? (
              <Button
                className="btn-wd-l font-weight-normal btn-weight-600"
                href="/ksiazka"
                variant="info"
                onClick={logOut}>
                <span className="no-icon">Wyloguj</span>
              </Button>
            ) : (
              <Button
                className="btn-wd-l"
                href="#login"
                onClick={() => setShowModal()}>
                <span className="no-icon">Logowanie</span>
              </Button>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      {showModal && (
        <LoginModal showModal={showModal} toggle={setShowModal} />
      )}
    </Navbar >
  );
}

export default AdminNavbar;
