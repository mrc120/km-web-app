import React, { useState, useEffect, Controller, } from 'react';
import Message from '../utils/Message';
import Progress from '../utils/ProgressBar';
import axios from 'axios';
import { Row, Form } from "react-bootstrap";


const SRV_URL = "http://localhost:8080"

const AddFile = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const [file_attachment, setAttachment] = useState();
  const [name, setName] = useState("Nie wybrano pliku");
  const [nameAtt, setNameAtt] = useState("Nie wybrano załączników");
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadedAttachement, setUploadedAttachement] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  const [validated, setValidated] = useState(false);
  const [uploadLoca, setUploadloca] = useState("")

  function handleLocaChange(e) {
    setUploadloca(e.target.value);
  }

  const uploadFile = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('file_attachment', file_attachment);


    if (file == null) {
      setMessage('Błąd! Nie uzupełniono formularza');
    } else {
      try {
        const res = await axios.post(uploadLoca, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          }
        });
        
                const { fileName, filePath } = res.data;
        
                setUploadedFile({ fileName, filePath });
        setTimeout(() => setUploadPercentage(0), 10000);
        
        setMessage('Plik został udostępniony na stronie, za chwilę strona zostanie odświeżona...');
        
        setTimeout(() => window.location.reload(true), 2000);

      } catch (err) {
        if (err.response.status === 500) {
          setMessage('Wystąpił problem z wysłaniem pliku.(Server error 500)');
        } else {
          // setMessage(err.response.data.msg);
        }
        setUploadPercentage(0)
      }
    }
  }
  return (
    <div className="mainpanel ">
      <div className="ml-1 row p-2 border bg-white justify-content-center" >
        <div className="mt-3 mb-3">
          <Form noValidate validated={validated} onSubmit={uploadFile}>
            <Row md="1" className="Row-fix">
              {message ? <Message className="w-75" msg={message} /> : null}
              <Form.Group>
                <Form.Label>Umieść do:</Form.Label>
                <Form.Control required as="select" type="select" onChange={handleLocaChange}>
                  <option value=''>Wybierz lokalizację</option>
                  <option value="http://localhost:8080/api/upload">Uchwały</option>
                  <option value="http://localhost:8080/api/upload_zarz">Zarządzenia</option>
                  <option value="http://localhost:8080/api/upload_podst">Polecenia służbowe</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Wybierz lokalizację docelową
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row md="1" className="Row-fix">
              <label>Nazwa dokumentu: </label>
              <Form.Control required
                onChange={(e => {
                  const { value } = e.target;
                  setTitle(value);
                })}
                name="title"
                placeholder="Wprowadź tytuł"
                type="text"
                id="title">
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Wprowadź tytuł dokumentu
              </Form.Control.Feedback>
            </Row>
            <Row md="1" className="Row-fix pb-0">
              <label htmlFor="description">Opis dokumentu: </label>
              <Form.Control as='textarea' rows={3} required
                onChange={(e => {
                  const { value } = e.target;
                  setDescription(value);
                  setCharacterCount(e.target.value.length);
                })}
                name="title"
                maxLength="200"
                placeholder="Wprowadź opis"
                type="text"
                id="title">
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Wprowadź opis dokumentu
              </Form.Control.Feedback>
            </Row>
            <p className="text-muted ml-4 p-1">Dopuszczalna ilość znaków: {characterCount}/200</p>

            <div style={{ width: 650 + 'px' }} className="row d-inline-flex ml-3 mr-3">
              <div className="col">
                <label>Dołącz plik:</label>
                <div className='custom-file mb-4'>
                  <Form.Group controlId="formFileLg" className="position-sticky w-100">
                    <Form.Control required type='file' enctype="multipart/form-data" and name="file"
                      className='custom-file-input'
                      onChange={(e => {
                        const file = e.target.files[0];
                        setName(e.target.files[0].name);
                        setFile(file);
                      })} />
                    <Form.Label className='custom-file-label'>{name}</Form.Label>
                    <Form.Control.Feedback type="invalid" className="position-relative">
                      Dołącz plik do formularza
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="col">
                <div className='custom-file mb-4'>
                  <label>Dołącz załącznik:</label>
                  <Form.Group enctype="multipart/form-data" and name="file" controlId="formFileLg" className="position-sticky w-100">
                    <Form.Control required type='file'
                      className='custom-file-input'
                      onChange={(e => {
                        const file_attachment = e.target.files[0];
                        setNameAtt(e.target.files[0].name)
                        setAttachment(file_attachment);
                      })} />
                    <Form.Label className='custom-file-label'>{nameAtt}</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      Dołącz załącznik</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Progress percentage={uploadPercentage} />
              <input
                type='submit'
                value='Prześlij'
                className='btn btn-fill btn-primary btn-fix' />
            </div>
          </Form>
        </div>
      </div>
    </div >
  );
};

export default AddFile;
