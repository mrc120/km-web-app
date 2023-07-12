import React, { useState } from "react"
import { Form, Row } from 'react-bootstrap'
import Message from "../utils/Message"
import Progress from "../utils/ProgressBar"


const EditModalForm = (children, showModal, toggle, id, title, description) => {

    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showFileUploadBoard, setFileUploadBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    const [characterCount, setCharacterCount] = useState(0);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [selectedItem2, setSelectedItem2] = useState({
        id: null,
        title: "",
        description: "",
    })
    console.log("tytul:", { title })

    const updateFile = (id) => {
        event.preventDefault();
        FilesService_podst.update(selectedItem2)
            .then(response => {
                console.log(response.data)
                setMessage("Zaaktualizowano pozycję, za chwilę nastąpi przekierowanie...")
                // setTimeout(() => window.location.reload(true), 2000);
            }).catch(e => {
                console.log(e);
            })
    }
    const handleInputChange = event => {
        const { name, value } = event.target;
        setSelectedItem2({ ...selectedItem2, [name]: value });
    }

    const showMessage = () => {
        const [message, setMessage] = useState("");
        return (
            <Row md="1" className="mt-4">
                {message ? <Message msg={message} /> : null}

            </Row>
        )
    }

    return (
        <div className="modal-title h2 d-flex justify-content-center ml-0">
            <div>JADWIGA {title}</div>
            <Form>
                {showMessage()}
                <Row md="1" className="Row-fix2 mt-0">
                    <h5>Nazwa dokumentu:{id} {title} {description} </h5>
                    <Form.Control
                        type="text"
                        data-id={id}
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleInputChange}>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Wprowadź tytuł dokumentu 
                    </Form.Control.Feedback>
                </Row>
                <Row md="1" className="Row-fix mt-4 pb-0">
                    <h5 htmlFor="description">Opis dokumentu: </h5>
                    <Form.Control as='textarea' rows={3}
                        id="description"
                        name="description"
                        onChange={handleInputChange}
                        value={description}
                        maxLength="200"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">
                        Wprowadź opis dokumentu
                    </Form.Control.Feedback>
                </Row>
                <p className="text-muted ml-4 p-1">Dopuszczalna ilość znaków: {characterCount}/200</p>
                <div className="mt-3 mb-3">
                    <Progress percentage={uploadPercentage} />
                    <input
                        type='submit'
                        onClick={updateFile}
                        className='btn btn-fill btn-primary btn-fix' />
                    <div className="d-flex justify-content-center mt-1">
                        <p className="btn w-25 btn-danger btn-fill " >Anuluj</p>
                    </div>
                </div>
            </Form>
        </div>



    )


}

export default EditModalForm