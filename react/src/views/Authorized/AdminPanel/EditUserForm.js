import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import Message from '../../../utils/Message';
import loadUsers from "../../../services/FetchData/loadUsers"

import UserService from "../../../services/Auth/auth.service"

const EditUserForm = () => {
    const { data } = loadUsers()
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("")

    const loadRole = () => {
        const rola = [
            { value: 0, name: 'Wybierz...' },
            { value: 2, name: 'Admin' },
            { value: 3, name: 'Rola dodawania użytkowników' },
            { value: 4, name: 'Rola dodawania plików' },
        ]
        return (
            <>
                <label className="form-group mt-3">Wybierz rolę:</label>
                <select
                    // onChange={onChangeInput}
                    className="Dropdown-c"
                    name="id"
                    variant="primary">
                    {rola.map(({ value, name }) =>
                        <option value={value}>{name}</option>)}
                </select>
            </>
        )
    }
    

    const User = {
        password: "",
    }
    const [formData, setFormData] = useState(User);

   

    const handleSubmit = (e) => {
        e.preventDefault();

        var data = {

            password: formData.password,
        };

        UserService.updatePassword2(formData.password)
            .then(response => {
                setFormData({
                    password: response.data.password,

                });
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            });

        setSuccessful(true);
        setMessage("Zapisano! Nastepuje przeładowanie strony...")

        // setTimeout(() => window.location.reload(true), 2000);
    }

    const onChangeInput = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
        console.log("id ->" + formData.id)
        console.log("password -> " + formData.password);
    }

    return (
        <div className="form-group">
            {message ? <Message className="w-75" msg={message} /> : null}

            <Form onSubmit={handleSubmit}>
                <h3 className="mb-4 mt-5">Edytuj wybranego użytkownika</h3>
                <label>Wybierz użytkownika:</label>
                <select
                    value={formData.id}
                    className="Dropdown-c form-control mb-3"
                    name="id"
                    onChange={onChangeInput}
                    variant="primary">
                    <option value="" selected disabled>Wybierz...</option>
                    {data.map((poz) =>
                        <option value={poz.id}>{poz.login}</option>)
                    }
                    console.log(formData.id)

                </select>
                <label className="form-group mt-3">Hasło:</label>
                <Input
                    name="password"
                    value={formData.password}
                    onChange={onChangeInput}
                    className="form-control mb-3">
                </Input>
                {/* {loadRole()} */}
                <button className="mt-4 mb-3 btn-fill btn btn-primary btn-block">Zapisz</button>
            </Form>
        </div>
    )

}
export default EditUserForm;
