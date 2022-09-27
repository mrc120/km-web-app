import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/Auth/auth.service";
import FilesPodstService from "../../services/Files/files_podst.service"


import { Modal, Form, Row } from 'react-bootstrap'
import ErrorIcon from '@mui/icons-material/Error';
import Message from '../../utils/Message';
import Progress from '../../utils/ProgressBar';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container } from "react-bootstrap";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';

import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "@material-ui/lab/Pagination";

import baseURL from "../../http-common"
import { defaults } from "browserslist";
const ShowList_podst = () => {

  const [entries, setEntries] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showFileUploadBoard, setFileUploadBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [message, setMessage] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState({
    id: null,
    title: "",
    description: "",
  })

  

  // const SRV_URL = "http://localhost:8080"

  const retrieveTutorials = () => {
    const params = getRequestParams(searchText, page, pageSize);
    FilesPodstService.getAll(params)
      .then(response => {
        const { entries, totalPages } = response.data;
        setEntries(entries);
        setCount(totalPages);
      }).catch((e) => {
        console.log(e);
      });
  }
  const sortedEntries = [...entries].sort((a, b) => entries.id > entries.id ? 1 : -1)

  
  const updateFile = () => {
    event.preventDefault();
    FilesPodstService.update(selectedItem2.id, selectedItem2)
      .then(response => {
        setMessage("Zaaktualizowano pozycję, za chwilę nastąpi przekierowanie...")
        setTimeout(() => window.location.reload(true), 2000);
        console.log(selectedItem2.id)
      }).catch(e => {
        console.log(e);
      })
  }

  const deleteFile = (id) => {
    FilesPodstService.remove(id)
      .then(response => {
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    window.location.reload(true);
  }

  const loggedUser = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setFileUploadBoard(user.roles.includes("ROLE_ADD_FILE"));
    }
  }

  useEffect(() => {
    loggedUser();
  }, []);
  useEffect(retrieveTutorials, [page, pageSize]);


  const expandModal = (poz) => {
    setSelectedItem(poz);
    setShowModal(true);
  }

  const expandModal2 = (poz) => {
    setSelectedItem2(poz);
    setShowModal2(true);
  }

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(true);
  }
  const closeModal2 = () => {
    setSelectedItem2(null);
    setShowModal2(true);
  }

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};
    if (searchTitle) {
      params["title"] = searchTitle;

    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSelectedItem2({ ...selectedItem2, [name]: value });
  }

  const handlePageChange = (e, value) => {
    setPage(value);
  }

  function base64ToArrayBuffer(data) {
    const bString = window.atob(data);
    const bLength = bString.length;
    const bytes = new Uint8Array(bLength);
    for (let i = 0; i < bLength; i++) {
      bytes[i] = bString.charCodeAt(i);
    }
    return bytes;
  }

  function base64toPDF(base64EncodedData, fileName = 'file') {
    const bufferArray = base64ToArrayBuffer(base64EncodedData);
    const blobStore = new Blob([bufferArray], { type: 'application/pdf' });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobStore);
      return;
    }
    const data = window.URL.createObjectURL(blobStore);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = data;
    link.download = `${fileName}.pdf`;
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
  }

  //styles pagination
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#fffff',
      },
    },
  });

  const useStyles = makeStyles(theme => ({
    ul: {
      "& .MuiPaginationItem-page.Mui-selected": {
        color: "#fff",
        backgroundColor: "#3a86bd",
      }
    }
  }));
  const classes = useStyles();

  return (
    <>
      <div className="mainpanel mt">
        <div className="content">
          <Container fluid>
            <Box
              noValidate
              sx={{ width: 450 }}
              component="form"
              autoComplete="on">
              <TextField
                className={classes.input}
                id="standard-basic"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                variant="outlined"
                onKeyUp={retrieveTutorials}
                placeholder="Wyszukaj..."
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  style: { fontSize: 16, height: 50, width: 450, left: 299, position: "absolute", top: -73 },                  startAdornment: (
                    <InputAdornment position="start" fontSize="small">
                      <SearchIcon style={{fontSize: 20, color: '#000000' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <div className="row">
              {sortedEntries &&
                sortedEntries.map((poz, index) => {
                  return (
                    <div className="col-md-3">
                      <div className="card ">
                        <div className="container">
                          <div className="row px-0">
                            <div className="col-sm-10 ">
                              <div className="h4u" data-id={poz.id}>{poz.title}</div>
                              <hr className="solid"></hr>
                              <div className="h5u">{poz.description}</div>
                            </div>
                            <div className="col-sm-2 flex-column px-0 btn-group">
                              <Button style={{ margin: '-1px -1px -1px 0' }}
                                className="d-flex align-items-center justify-content-center border-bottom  rounded-top rounded-bottom-left-1 rounded-bottom-0   px-0 "
                                target="_blank" onChange={open}
                                href={defaults.baseURL + "/api/files_podst/" + poz.name} >
                                <i className="nc-icon nc-cloud-download-93 size-up-down "></i>
                              </Button>
                              <Button style={{ margin: '0 -1px 0px 0' }} className="d-flex align-items-center justify-content-center rounded-top-0  rounded-0 px-0"
                                target="_blank" onChange={open}
                                href={defaults.baseURL + "/api/files_podst/" + poz.nameAtt} >
                                <i className="nc-icon nc-attach-87 size-up-down"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                        {(showAdminBoard || showFileUploadBoard) &&
                          <div className="row ">
                            <div className="col-sm px-0 ml-3 ">
                              <Link style={{ margin: '-1px 0 -1px 0px' }} className="btn form-control px-0 btn-danger border-right border-bottom border-left rounded-0"
                                onClick={() => expandModal2(poz)}>
                                Edytuj
                              </Link>
                            </div>
                            <div className="col-sm px-0 mr-3 ">
                              <Button style={{ margin: '-1px 0 -1px 0px' }} className="btn col-12 btn-block w-100 form-control pd-5 btn btn-danger border-right border-bottom rounded-0"
                                onClick={() => expandModal(poz)}>
                                Usuń
                              </Button>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  )
                })}

              {/* //MODAL  */}
              <Modal className="modal-backdrop" show={showModal} onRequestClose={closeModal}>
                <Modal.Body className="mt-2 d-flex justify-content-center" closeButton>
                  <ErrorIcon sx={{ color: "#FF4A55", fontSize: "120px !important" }} />
                </Modal.Body>
                <Modal.Body className="modal-title h2 d-flex justify-content-center ml-0">Jesteś pewien?</Modal.Body>
                <Modal.Body className="h4 d-flex justify-content-center  mt-2 mb-4">Czy na pewno chcesz usunąć tą pozycję? </Modal.Body>
                <p className="d-flex justify-content-center mb-1 ">Próbujesz usunąć pozycję o nazwie:</p>
                <p clclassNamess="font-weight-bold d-flex justify-content-center mb-4">{selectedItem && selectedItem.title}</p>
                <Modal.Footer className="justify-content-center d-flex mb-3">
                  <p className="btn btn-secondary btn-fill mr-5"
                    onClick={() => setShowModal(false)}>Anuluj</p>
                  <p className="btn btn-danger btn-fill ml-5"
                    onClick={() => deleteFile(selectedItem.id)}>Tak, usuń</p>
                </Modal.Footer>
              </Modal>

              {/*MODAL EDIT */}
              <Modal className="modal-backdrop" show={showModal2} onRequestClose={closeModal2}>
                <Modal.Body className="modal-title h2 d-flex justify-content-center ml-0">
                  <Form>
                    <Row md="1" className="mt-4">
                      {message ? <Message msg={message} /> : null}
                    </Row>
                    <Row md="1" className="Row-fix2 mt-0">
                      <h5 htmlFor="title">Nazwa dokumentu: </h5>
                      <Form.Control
                        type="text"
                        id="title"
                        name="title"
                        value={selectedItem2.title}
                        onChange={handleInputChange}>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Wprowadź tytuł dokumentu
                      </Form.Control.Feedback>
                    </Row>

                    {/* //opis dokumentu  */}
                    <Row md="1" className="Row-fix mt-4 pb-0">
                      <h5 htmlFor="description">Opis dokumentu: </h5>
                      <Form.Control as='textarea' rows={3}
                        id="description"
                        name="description"
                        onChange={handleInputChange}
                        value={selectedItem2.description}
                        maxLength="200"
                        type="text"
                      >
                      </Form.Control>
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
                        <p className="btn w-25 btn-danger btn-fill "
                          onClick={() => setShowModal2(false)}>Anuluj</p>
                      </div>
                    </div>
                  </Form>
                </Modal.Body>

              </Modal>

            </div>
            <div className="mt-0">
              <ThemeProvider theme={theme}>
                <Pagination
                  classes={{ ul: classes.ul }}
                  className="my-3 d-flex justify-content-center"
                  count={count}
                  page={page}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                  siblingCount={1}
                  boundaryCount={1}
                  onChange={handlePageChange}
                />
              </ThemeProvider>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ShowList_podst;
