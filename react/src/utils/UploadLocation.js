import React, { useState, useEffect } from 'react';
import { Row, Form, Col, Button } from "react-bootstrap";

const uploadLocation = () => {

    const [uploadLoca, setUploadloca] = useState("")

    const handleLocaChange = (e) => {
        setUploadloca(e.target.value);
        console.log(e.target.value)
    }
    useEffect(() => {
        return (
            <>
                <Form.Label>Umieść do:</Form.Label>
                <Form.Control as="select" type="select" onChange={handleLocaChange}>
                    <option value=''>Wybierz lokalizację</option>
                    <option value="http://localhost:8080/api/upload">Uchwały</option>
                    <option value="http://localhost:8080/api/upload_zarz">Zarządzenia</option>
                    <option value="http://localhost:8080/api/upload_podst">Polecenia służbowe</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Wybierz lokalizację docelową
                </Form.Control.Feedback>
            </>

        )
    })
    return {uploadLoca}

}

export default uploadLocation;