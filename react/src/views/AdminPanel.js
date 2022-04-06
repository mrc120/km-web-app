import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import KsiazkaDataService from "../services/KsiazkaService";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function handleLocaChange(e) {
  selectRole(e.target.value);
  console.log(uploadLoca);
}

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

const lista = {
  id: null,
  nazwa: "",
};

const AdminPanel = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [ksiazka, setEmployee] = useState(lista);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const wybierzRole = [
    { value: 2, name: 'Admin' },
    { value: 3, name: 'Rola dodawania użytkowników' },
    { value: 4, name: 'Rola dodawania plików' },
  ]

  const saveEmployee = () => {
    var data = {
      id: ksiazka.id,
      nazwa: ksiazka.nazwa,
    };

    //Do zmiany dataservice
    KsiazkaDataService.create(data)
      .then(response => {
        setEmployee({
          id: response.data.id,
          nazwa: response.data.nazwa
        });
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployee({ ...ksiazka, [name]: value });
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
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
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="mainpanel">
      <div className=" container flex-row p-4 w-50 border bg-white justify-content-center">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <h3 classname>Zarejestruj nowego użytkownika</h3>

              <div className="form-group">

                <label htmlFor="username">Login</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Hasło</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <label>Wybierz rolę</label>
              <select
                onChange={handleLocaChange}
                className="browser-default custom-select">
                <option defaultValue="1">Wybierz...</option>
              </select>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Utwórz konto</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div className="form-group">
          <h3 className="">Edytuj obecnego użytkownika  </h3>
          <label>Wybierz rolę</label>
          <select
       
            onChange={handleInputChange}
            className="Dropdown-c"
            name="role"
            id="role"
            variant="primary">
            {wybierzRole.map(({ value, name }, index) =>
              <option value={value}>{name}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;