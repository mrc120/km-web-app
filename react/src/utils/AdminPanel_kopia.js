import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { Button, Row, Col } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import axios from "axios";
import AuthService from "../services/Auth/auth.service";

import { vusername, vpassword, required } from "../utils/validateForm"





const RegisterUserAdminTab = () => {


}

const EditUserAdminTab = () => {




}


const AdminPanel = () => {
  const form = useRef("");
  const form2 = useRef();
  const checkBtn = useRef();

  const [Employee, setEmployee] = useState({
    id: null,
    password: ''
  });

  const [uChange, setUChange] = useState({});
  const [uPassword, setuPassword] = useState({});
  const [role, setRole] = useState({});


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [successful2, setSuccessful2] = useState(false);
  const [message2, setMessage2] = useState("");
  const [message, setMessage] = useState("");

  const [getUser, setUser] = useState({ data: [] });


  const wybierzRole = [
    { value: 0, name: 'Wybierz...' },
    { value: 2, name: 'Admin' },
    { value: 3, name: 'Rola dodawania użytkowników' },
    { value: 4, name: 'Rola dodawania plików' },
  ]

  const URL_USER = "http://localhost:8080/api/auth/users/";

  useEffect(() => {
    axios.get(URL_USER).then(response => {
      let data = response.data
      setUser({ data: data })
    }).catch(function (error) {
      console.log(error)
    });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/auth/users/` + uChange, uPassword).then((response) => {
      console.log(response.status);
    }).catch(function (error) {
      console.log(error)
    });
    axios.put(`http://localhost:8080/api/auth/user_roles/` + uChange, role).then((response) => {
      console.log(response.status);
    }).catch(function (error) {
      console.log(error)
    });
    setMessage("Sukces")
    setSuccessful2(true);
    setTimeout(() => window.location.reload(true), 2000);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage("Sukces");
          setSuccessful(true)
          setTimeout(() => window.location.reload(true), 2000);

        }
      );
    }

  };


  const handleInputChange = event => {
    setUChange(event.target.value);
    console.log(uChange);
  };

  const handleInputChangeD = event => {
    setRole({ roleId: event.target.value });
    console.log(role);
  };
  const handleInputChangePassword = event => {
    setuPassword({ password: event.target.value });
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);

  };

  return (
    <div className="mainpanel">
      <div className="container flex-row px-0 w-50 mt-3 border bg-white justify-content-center">
        <Tabs defaultActiveKey="zarejestruj" id="uncontrolled-tab-example"
          className="mb-3 justify-content-center nav nav-tabs nav-fill nav-border nav-pills red">
          <Tab eventKey="zarejestruj" title="Zarejestruj użytkownika">
            <Form onSubmit={handleRegister} ref={form}>
              {message && (
                <div className="form-group">
                  <div
                    className={successful ? "alert alert-primary w-100" : "alert alert-danger"} role="alert">
                    Zarejestrowano nowego użytkownika! Następuje przeładowanie strony...
                  </div>
                </div>
              )}
              {!successful && (
                <div className="form-group">
                  <h3 className="mb-3 mt-5">Zarejestruj nowego użytkownika</h3>
                  <label htmlFor="username">Login:</label>
                  <Input
                    type="text"
                    className="form-control mb-3"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                  <label htmlFor="password">Hasło:</label>
                  <Input
                    type="password"
                    className="form-control mb-3"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                  />
                  <button className="mt-4 mb-5 btn btn-fill btn-primary btn-block">Utwórz konto</button>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </Tab>
          <Tab eventKey="edytuj" title="Edytuj użytkownika">
            <div className="form-group">
              {message2 && (
                <div className="form-group">
                  <div
                    className={successful2 ? "alert alert-primary w-100" : "alert alert-danger"}
                    role="alert">
                    <p>Zapisano! Nastepuje przeładowanie strony...</p>
                  </div>
                </div>
              )}
              <h3 className="mb-3 mt-5">Edytuj wybranego użytkownika</h3>
              {!successful2 && (
                <Form onSubmit={handleEdit} ref={form2} >
                  <label>Wybierz użytkownika</label>
                  <select
                    selected="Wybierz.."
                    onChange={handleInputChange}
                    className="Dropdown-c form-control mb-3"
                    name="role"
                    variant="primary">
                    <option value="" selected disabled>Wybierz...</option>
                    {getUser.data.map((poz, index) =>
                      <option value={poz.id}>{poz.login}</option>)}
                  </select>
                  <label className="form-group mt-3">Hasło:</label>
                  <Input
                    onChange={handleInputChangePassword}
                    className="form-control mb-3">
                  </Input>
                  <label className="form-group mt-3">Wybierz rolę</label>
                  <select
                    onChange={handleInputChangeD}
                    className="Dropdown-c"
                    name="email"
                    id="email"
                    variant="primary">
                    {wybierzRole.map(({ value, name }, index) =>
                      <option value={value}>{name}</option>)}
                  </select>
                  <button className="mt-4 mb-3 btn-fill btn btn-primary btn-block">Zapisz</button>
                </Form>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;