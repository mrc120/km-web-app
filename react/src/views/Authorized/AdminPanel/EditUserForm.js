import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import Message from '../../../utils/Message';
import loadUsers from "../../../services/FetchData/loadUsers"
import UserService from "../../../services/Auth/auth.service"

const EditUserForm = () => {
    const { data } = loadUsers();
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        id: 0,
        password: "",
        roleId: 0,
    });

    const loadRole = () => {
        const roles = [
            { value: 0, name: 'Wybierz...' },
            { value: 2, name: 'Admin' },
            { value: 3, name: 'Rola dodawania użytkowników' },
            { value: 4, name: 'Rola dodawania plików' },
        ]

        const handleRoleChange = event => {
            const { name, value, dataset } = event.target;
            const fieldName = dataset.name
            setFormData(prevFormData => ({
                ...prevFormData,
                [fieldName]: value
            }))
        }

        return (
            <>
                <label className="form-group mt-3">Wybierz rolę:</label>
                <select
                    onChange={handleRoleChange}
                    className="Dropdown-c"
                    name="roleId"
                    key="roleId"
                    data-name="roleId"
                    variant="primary">
                    {roles.map((poz) =>
                        <option value={poz.value || 0}>{poz.name}</option>)}
                </select>
            </>
        )
    }

    const editForm = () => {
        const onChangeInput = event => {
            const { value, dataset } = event.target;
            const fieldName = dataset.name

            setFormData(prevFormData => ({
                ...prevFormData,
                [fieldName]: value
            }));
        }
        return (
            <>
                <label>Wybierz użytkownika:</label>
                <select
                    name="id"
                    key="id"
                    data-name="id"
                    value={formData.id || 0}
                    onChange={onChangeInput}
                    className="Dropdown-c form-control mb-3"
                    variant="primary"
                >
                    <option value="0" disabled>Wybierz...</option>
                    {data.map((poz) => (
                        <option value={poz.id}>{poz.login}</option>
                    ))}
                </select>
                <label className="form-group mt-3">Hasło:</label>
                <Input
                    name="password"
                    data-name="password"
                    key="password"
                    onChange={onChangeInput}
                    placeholder="Puste pole nie zostanie zaaktualizowane"
                    value={formData.password || ""}
                    className="form-control mb-3"
                />
            </>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== "") {
            UserService.updatePassword(formData.id, formData.password)
                .then(response => {
                    setFormData({
                        // id: response.data.login,
                        password: response.data.password,
                    });
                }).catch(e => {
                    console.log(e);
                });
        }
        if (formData.roleId !== 0) {
            UserService.updateRole(formData.id, formData.roleId)
                .then(response => {
                    setFormData({
                        // id: response.data.login,
                        roleId: response.data.roleId
                    })
                }).catch(function (error) {
                    console.log(error)
                })
        }
        if (formData.id !== 0 && (formData.password !== '' || formData.roleId !== 0)) {
            setMessage("Zapisano! Nastepuje przeładowanie strony...");
            //console.log("id: ", formData.id, "login: ", formData.login, "password: ", formData.password)
            setTimeout(() => window.location.reload(true), 2000);
        } else {
            setMessage("Nie wybrano roli ani hasła do zmiany")
        }
    }

    return (
        <div className="form-group">
            {message ? <Message msg={message} /> : null}
            <Form onSubmit={handleSubmit}>
                <h3 className="mb-4 mt-5">Edytuj wybranego użytkownika</h3>
                {editForm()}
                {loadRole()}
                <button className="mt-4 mb-3 btn-fill btn btn-primary btn-block">Zapisz</button>
            </Form>
        </div>
    )
}

export default EditUserForm;
