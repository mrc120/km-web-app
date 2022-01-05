import React, { Fragment, useState, useEffect } from 'react';
import Message from '../components/Message';
import Progress from '../components/Progress';
import axios from 'axios';
import {
  Card,
  Table,
  Container,
  Row,
  Form,
  Col,
} from "react-bootstrap";


const AddFile = () => {
  const [file, setFile] = useState();
  const [name, setName] = useState("Wybierz plik...");
  const [title, setTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const uploadFile = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('file', file);
    console.log(formData);

    if (file == null) {
      setMessage('Błąd! Nie wybrano pliku');
    } else {
      try {
        const res = await axios.post('http://localhost:8080/api/upload', formData, {
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

        setTimeout(() => setUploadPercentage(0), 10000);

        const { fileName, filePath } = res.data;

        setUploadedFile({ fileName, filePath });
        setMessage('Plik został udostępniony na stronie');
      } catch (err) {
        if (err.response.status === 500) {
          setMessage('Coś nie tak z plikiem (Server error 500)');
        } else {
          setMessage(err.response.data.msg);
        }
        setUploadPercentage(0)
      }
    }
  }

  return (
    <div className="mainpanel">
      <Container fluid>
        <Col md="6" className="Row-fix">
          <Card>
            <Card.Body>
              <Fragment>
                {message ? <Message msg={message} /> : null}
                <Row md="1" className="Row-fix">
                  <form>
                    <label htmlFor="title">Nazwa Uchwały</label>
                    <Form.Control
                      onChange={(e => {
                        const { value } = e.target;
                        setTitle(value);
                      })}
                      className="form"
                      name="title"
                      placeholder="Podaj nazwę"
                      type="text"
                      id="title"
                    ></Form.Control>
                  </form>
                </Row>
                <Row md="1" className="Row-fix">
                  <label>Wybierz Plik</label>
                  <form onSubmit={uploadFile}>
                    <div className='custom-file mb-4'>
                      <input
                        type='file'
                        className='custom-file-input'
                        name='file'
                        id='file'
                        onChange={(e => {
                          const file = e.target.files[0];
                          setName(e.target.files[0].name);
                          setFile(file);
                        })} />
                      <label className='custom-file-label'>
                        {name}
                      </label>
                    </div>
                    <Progress percentage={uploadPercentage} />
                    <input
                      type='submit'
                      value='Prześlij'
                      className='btn btn-fill btn-primary btn-fix' />
                  </form>
                </Row>
              </Fragment>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default AddFile;
