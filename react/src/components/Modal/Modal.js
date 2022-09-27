import React, { useRef, useState, useEffect } from "react";
import { createPortal } from 'react-dom'
import { StyledModal } from './style'
import { Button } from "react-bootstrap";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/Auth/auth.service.js";

import km_logo from '../../assets/img/logokmclear.png'
import { ModalHeader } from "reactstrap";

function Portal({ children }) {
  const modalRoot = document.getElementById('modal-root')
  const [element] = useState(document.createElement('div')) 


  useEffect(() => {
    modalRoot.appendChild(element)

    // cleanup method to remove the appended child
    return function cleanup() {
      modalRoot.removeChild(element)
    }
  }, [modalRoot, element])

  return createPortal(children, element)
}

const renderModalHeader = () => {
  return (
    <>
      <img className="mt-2" src={km_logo} width="100px" height="60px" />
      <h2 className="modal-title km-color mt-2 ">Zaloguj się</h2>
    </>
  )
}

const renderLogin = () => {
  const checkBtn = useRef();
  const form = useRef();
  // const [form, setForm] = useState('');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <>

      <div className="autocenter">
        <Form onSubmit={handleLogin} ref={form} >
          <label className="left">Login:</label>
          <Input
            type="string"
            className="marbot borderidea"
            value={email}
            name="email"
            placeholder="Login"
            onChange={onChangeUsername}
            validations={[required]}
          />
          <label className="left" htmlFor="password">Hasło:</label>
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
        {/* <Button
          className="btn-simple2 mt-3"
          type="button"
          variant="link"
          onClick={() => setShowModal(false)}>
          Zamknij
        </Button> */}
      </div>
    </>
  )
}

// A modal component which will be used by other components / pages
function LoginModal({ children, showModal, toggle }) {
  return (
    <Portal>
      {showModal && (
        <StyledModal.Backdrop >

          <StyledModal.ModalOverlay onClick={toggle} >
            <StyledModal.ModalHeader>
              {(renderModalHeader())}
            </StyledModal.ModalHeader>
            <StyledModal.ModalBody>
              {(renderLogin())}
            </StyledModal.ModalBody>
            <StyledModal.CloseButton onClick={toggle}>
              Zamknij
            </StyledModal.CloseButton>
          </StyledModal.ModalOverlay>
        </StyledModal.Backdrop >
      )}
    </Portal>
  )
}


export default LoginModal
