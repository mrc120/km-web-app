import React, { useState, useEffect, Controller, } from 'react';
import Select from 'react-select';
import Message from '../components/Message';
import Progress from '../components/Progress';
import axios from 'axios';
import { Row, Form } from "react-bootstrap";

const AddFile = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const [name, setName] = useState("Nie wybrano pliku");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  const [uploadLoca, setUploadloca] = useState('')

  function handleLocaChange(e) {
    setUploadloca(e.target.value);
    console.log(uploadLoca)
  }

  const uploadFile = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    console.log(formData);

    if (file == null) {
      setMessage('Błąd! Nie wybrano pliku');
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
        setTimeout(() => setUploadPercentage(0), 10000);
        const { fileName, filePath } = res.data;
        setUploadedFile({ fileName, filePath });
        setMessage('Plik został udostępniony na stronie');

      } catch (err) {
        if (err.response.status === 500) {
          setMessage('Wystąpił problem z wysłaniem pliku.(Server error 500)');
        } else {
          setMessage(err.response.data.msg);
        }
        setUploadPercentage(0)
      }
    }
  }
  return (
    <div className="mainpanel">
      <div className="ml-1  row p-4 w-100 border bg-white justify-content-center">
        <div className="Md-5">
        {message ? <Message msg={message} /> : null}
          <Row md="1" className="Row-fix">
            <label >Umieść do:</label>
            <form>
              <select

                onChange={handleLocaChange}
                className="browser-default custom-select">
                <option defaultValue="1">Wybierz lokalizację</option>
                <option value="http://localhost:8080/api/upload">Uchwały</option>
                <option value="http://localhost:8080/api/upload_zarz">Zarządzenia</option>
                <option value="http://localhost:8080/api/upload_podst">Podstawy prawne</option>
              </select>
            </form>


            {/* nazwa dokumentu */}
          </Row>
          <Row md="1" className="Row-fix">
            <label htmlFor="title">Nazwa dokumentu: </label>
            <Form.Control
              onChange={(e => {
                const { value } = e.target;
                setTitle(value);
              })}
              required
              className="form"
              name="title"
              placeholder="Wprowadź tytuł"
              type="text"
              id="title"
            ></Form.Control>
          </Row>

          {/* //opis dokumentu  */}
          <Row md="1" className="Row-fix pb-0">
            <label htmlFor="description">Opis dokumentu: </label>
            <Form.Control as='textarea' rows={3}
              onChange={(e => {
                const { value } = e.target;
                setDescription(value);
                setCharacterCount(e.target.value.length);
              })}
              required
              className="form"
              name="title"
              maxLength="200"
              placeholder="Wprowadź opis"
              type="text"
              id="title"
            ></Form.Control>
          </Row>
          <p class="text-muted ml-4 p-1">Dopuszczalna ilość znaków: {characterCount}/200</p>
          {/* //dolacz plik */}
          <Row md="1" className="Row-fix2">
            <label>Dołącz plik:</label>
            <form onSubmit={uploadFile}>
              <div className='custom-file mb-4'>
                <input required
                  type='file'
                  className='custom-file-input'
                  id='file'
                  onChange={(e => {
                    const file = e.target.files[0];
                    setName(e.target.files[0].name);
                    setFile(file);
                  })} />
                <label className='custom-file-label'>
                  {name}
                </label>
                <p class="text-muted text-center p-3 font-italic">Obsługiwane są tylko pliki w formacie .PDF</p>
              </div>
              <div className="mt-2">
                <Progress percentage={uploadPercentage} />
                <input
                  type='submit'
                  value='Prześlij'
                  className='btn btn-fill btn-primary btn-fix' />
              </div>
            </form>
          </Row>
        </div>
      </div>
    </div >
  );
};

export default AddFile;
