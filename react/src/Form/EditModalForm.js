import React, { useState } from "react"
import { Form, Row } from 'react-bootstrap'
import Message from "../utils/Message"
import Progress from "../utils/ProgressBar"

import FilesService_podst from "../services/Files/files_podst.service"

const EditModalForm = ({ id, title, description }) => {

    const [selectedItem, setSelectedItem] = useState({
        id: id,
        title: title,
        description: description,
    })
    const [message, setMessage] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [uploadPercentage, setUploadPercentage] = useState(0);


    const handleInputChange = event => {
        const { name, value } = event.target;
        setSelectedItem({ ...selectedItem, [name]: value });
    }

    const updateFile = () => {
        event.preventDefault();
        FilesService_podst.update(selectedItem.id, selectedItem)
            .then(() => {
                setMessage("Zaaktualizowano pozycję, za chwilę nastąpi przekierowanie...")
                setTimeout(() => window.location.reload(true), 2000);
            }).catch(e => {
                console.log(e);
            })
    }

    return (
            <Form>
                <Row md="1" className="Row-fix2">
                    {message ? <Message msg={message} /> : null}
                    <p className="h5">Nazwa dokumentu:</p>
                    <Form.Control
                        type="text"
                        id="title"
                        name="title"
                        value={selectedItem.title}
                        onChange={handleInputChange} />
                    <Form.Control.Feedback type="invalid">
                        Wprowadź tytuł dokumentu
                    </Form.Control.Feedback>
                </Row>
                <Row className="Row-fix mt-4 pb-0">
                    <p className="h5">Opis dokumentu:</p>
                    <Form.Control as='textarea' rows={3}
                        id="description"
                        name="description"
                        onChange={handleInputChange}
                        value={selectedItem.description}
                        maxLength="200"
                        type="text" />
                    <Form.Control.Feedback type="invalid">
                        Wprowadź opis dokumentu
                    </Form.Control.Feedback>
                </Row>
                <input
                    type='submit'
                    onClick={updateFile}
                    className='btn btn-fill btn-primary btn-fix' />
            </Form>
    )
}
export default EditModalForm