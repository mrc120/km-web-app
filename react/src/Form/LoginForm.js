import React, { useRef, useState } from "react";

import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button"
import AuthService from "../services/Auth/auth.service.js";

const LoginForm = () => {
    const checkBtn = useRef();
    const form = useRef();

    const [login, setLogin] = useState("");
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
        const login = e.target.value;
        setLogin(login);
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
            AuthService.login(login, password).then(
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
            <div className="container text-center">
                <Form onSubmit={handleLogin} ref={form} >
                    <label className="left mr-4">Login:</label>
                    <Input type="string"
                        className=" borderidea mb-4"
                        value={login}
                        name="login"
                        placeholder="Login"
                        onChange={onChangeUsername}
                        validations={[required]}
                    />
                    <label className="left mr-4">Hasło:</label>
                    <Input
                        className="borderidea mb-4"
                        placeholder="********"
                        name="password"
                        type="password"
                        onChange={onChangePassword}
                        validations={[required]}
                    />
                    {message && (
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    )}
                    <div className="d-flex justify-content-center">
                        <CheckButton ref={checkBtn} className="btn-fill btn btn-info btn-group d-flex align-items-center" disabled={loading}>
                            <span>Logowanie</span>
                            {loading && (
                                <span className="spinner-border spinner-border-sm ml-1 "></span>
                            )}
                        </CheckButton>
                    </div>
                    {/* <CheckButton className="mt-2" style={{ display: "none" }}  /> */}

                </Form>
            </div>
        </>
    )

}

export default LoginForm;