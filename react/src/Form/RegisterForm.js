import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/Auth/auth.service";

import { vusername, vpassword, required } from "./validateForm"

const RegisterForm = () => {

    const form = useRef("");
  
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
  
 
  
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

  
    //USER FORM 
    // WYDZIELIC DO 
    const handleRegister = (e) => {
      e.preventDefault();
  
      // setSuccessful(false);
  
      // co to jest?
      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(username, password).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            //wydzielilc errora
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              //wydzielic to 
            setMessage("Sukces");
            setSuccessful(true)
            setTimeout(() => window.location.reload(true), 2000);
          }
        );
      }
    };
  
    return (
      <Form onSubmit={handleRegister} ref={form}>
        {message && (
          <div className="form-group">
  
            {/* wydzielic */}
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
    )

}
  
  export default RegisterForm;