import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";

const EditUserForm = () => {

    //form
    const [uChange, setUChange] = useState({});
    const [getUser, setUser] = useState({ data: [] });
    const [uPassword, setuPassword] = useState({});
    const [role, setRole] = useState({});

    const [successful2, setSuccessful2] = useState(false);
    const [message, setMessage] = useState("");

    const URL_USER = "http://localhost:8080/api/auth/users/";

    useEffect(() => {
        axios.get(URL_USER).then(response => {
            let data = response.data
            setUser({ data: data })
        }).catch(function (error) {
            console.log(error)
        });
    }, []);


    const wybierzRole = [
        { value: 0, name: 'Wybierz...' },
        { value: 2, name: 'Admin' },
        { value: 3, name: 'Rola dodawania użytkowników' },
        { value: 4, name: 'Rola dodawania plików' },
    ]

    const handleInputChange = event => {
        setUChange(event.target.value);
        console.log(uChange);
      };

    const handleInputPassword = event => {
        setuPassword({ password: event.target.value });
    };

    const handleInputRole = event => {
        setRole({ roleId: event.target.value });
    };

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

    return (
        <div className="form-group">
            {message &&
                <div className="form-group">
                    <div
                        className="alert alert-primary w-100">
                        <p>Zapisano! Nastepuje przeładowanie strony...</p>
                    </div>
                </div>
            }
            {!successful2 && (
                <Form onSubmit={handleEdit}>
                    <h3 className="mb-4 mt-5">Edytuj wybranego użytkownika</h3>
                    <label>Wybierz użytkownika</label>

                    <select
                        selected="Wybierz.."
                        onChange={handleInputChange}
                        className="Dropdown-c form-control mb-3"
                        name="role"
                        variant="primary">
                        <option value="" selected disabled>Wybierz...</option>
                        {getUser.data.map((poz) =>
                            <option value={poz.id}>{poz.login}</option>)}
                    </select>

                    <label className="form-group mt-3">Hasło:</label>
                    <Input
                        onChange={handleInputPassword}
                        className="form-control mb-3">
                    </Input>

                    <label className="form-group mt-3">Wybierz rolę:</label>
                    <select
                        onChange={handleInputRole}
                        className="Dropdown-c"
                        name="email"
                        id="email"
                        variant="primary">
                        {wybierzRole.map(({ value, name }) =>
                            <option value={value}>{name}</option>)}
                    </select>

                    <button className="mt-4 mb-3 btn-fill btn btn-primary btn-block">Zapisz</button>
                </Form>
            )}
        </div>
    )
}
export default EditUserForm  