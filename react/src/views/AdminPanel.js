import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import axios from "axios";
import {
  Button,
  Row,
  Col,
} from "react-bootstrap";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 32) {
    return (
      <div className="alert alert-danger" role="alert">
        Login musi posiadać minimum 3 znaki.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Hasło musi posiadać min. 6 znaków.
      </div>
    );
  }
};

const AdminPanel = () => {
  const form = useRef("");
  const checkBtn = useRef();
  const form2 = useRef();

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

  const sendData = (e) => {
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
    setMessage2("Sukces")
    setSuccessful2(true);
  }



  const handleInputChange = event => {
    setUChange(event.target.value);
    console.log(uChange);
  };

  const handleInputChangeD = event => {
    setRole({roleId: event.target.value});
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
    setPassword(password );
    
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
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
          setMessage(resMessage);
         setSuccessful(true)
        }
      );
    }

  };

  return (
    <div className="mainpanel">
      <div className=" container flex-row p-4 w-50 border bg-white justify-content-center">
    
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div className="form-group">
              <h3>Zarejestruj nowego użytkownika</h3>
              <label htmlFor="username">Login</label>
              <Input
                type="text"
                className="form-control mb-3"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required, vusername]}
              />

              <label htmlFor="password">Hasło</label>
              <Input
                type="password"
                className="form-control mb-3"
                name="password"
                value={password}
                
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
              <button className="mt-4 btn btn-primary btn-block">Utwórz konto</button>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-primary" : "alert alert-danger"}
                role="alert">
                  {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>


        <div className="form-group">
          <h3 className="mb-3 mt-5">Edytuj obecnego użytkownika</h3>
            {!successful2 && (
          <Form onSubmit={sendData} ref={form2} >
            <label>Wybierz użytkownika</label>

            <select
              selected= "Wybierz.."
              onChange={handleInputChange}
              className="Dropdown-c form-control mb-3"
              name="role"
              variant="primary">
              <option value="" selected disabled>Wybierz...</option>
              {getUser.data.map((poz, index) =>
                <option value={poz.id}>{poz.email}</option>)}
            </select>


            <label className="form-group mt-3">Hasło:</label>
            <Input
              onChange={handleInputChangePassword}
              className="form-control mb-3"


            ></Input>

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
          
          
            <button className="mt-4 btn btn-primary btn-block">Zapisz</button>
          </Form>
            )}
          {message2 && (
            <div className="form-group">
              <div
                className={successful2 ? "alert alert-primary" : "alert alert-danger"}
                role="alert">
                  <p>Edytowano użytkownika</p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminPanel;