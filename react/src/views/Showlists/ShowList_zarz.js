import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilesZarzService from '../../services/Files/files_zarz.service'
import AuthService from "../../services/Auth/auth.service";
import http from "../../http-common"

import {getRequestParams} from "../../utils/Paginationreq";

// import Modal from '../components/Modal.js';
import { Modal, Form, Row } from 'react-bootstrap'
import ErrorIcon from '@mui/icons-material/Error';
import Message from '../../utils/Message';
import Progress from '../../utils/ProgressBar';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container } from "react-bootstrap";
import { createStyles, createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "@material-ui/lab/Pagination";


const ShowList_zarz = () => {

  const [entries, setEntries] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);

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

  const SRV_URL = "http://localhost:8080"

  // const sortedEntries = [...entries].sort((a, b) => entries.id > entries.id ? 1 : -1)
  
  const retrieveTutorials = () => {
    
    FilesZarzService.getAll()
    .then((response) => {
      const entries = response.data;
      setEntries(entries);
      console.log(entries);
    }).catch((e) => {
      console.log(e);
    });
  }

  // const retrieveTutorials = () => {
 
  //   axios.get("http://localhost:8080/api/files_zarz/")
  //     .then(response => {
    
  //       setEntries(response.data);
  //     }).catch((e) => {
  //       console.log(e);
  //     });
  // }


  
  const updateFile = () => {
    event.preventDefault();
    FilesZarzService.update(selectedItem2.id, selectedItem2)
      .then(response => {
        setMessage("Zaaktualizowano pozycję, za chwilę nastąpi przekierowanie...")
        setTimeout(() => window.location.reload(true), 2000);
      }).catch(e => {
        console.log(e);
      })
    }
    
  const deleteFile = (id) => {
    FilesZarzService.remove(id)
    .then(response => {
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
    window.location.reload(true);
  }

    useEffect(() => {
    retrieveTutorials();
  }, []);

  
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
           
              <TextField
                className={classes.input}
                id="standard-basic "
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                variant="outlined"
                onKeyUp={retrieveTutorials}
                placeholder="Wyszukaj..."
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  style: { fontSize: 16, height: 50, width: 450, left: 299, position: "absolute", top: -73 },
                  startAdornment: (
                    <InputAdornment position="start" fontSize="small">
                      <SearchIcon style={{fontSize: 20, color: '#000000' }} />
                    </InputAdornment>
                  ),
                }}
              />
     
            <div className="row">
              {entries && entries
                .map((poz) => {
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
                                href={SRV_URL + "/api/files_zarz/" + poz.name} >
                                <i className="nc-icon nc-cloud-download-93 size-up-down "></i>
                              </Button>
                              <Button style={{ margin: '0 -1px 0px 0' }} className="d-flex align-items-center justify-content-center rounded-top-0  rounded-0 px-0"
                                target="_blank" onChange={open}
                                href={SRV_URL + "/api/files_zarz/" + poz.nameAtt} >
                                <i className="nc-icon nc-attach-87 size-up-down"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                        {/* {(showAdminBoard || showFileUploadBoard) && */}
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
                        {/* } */}
                      </div>
                    </div>
                  )
                })}

           
          

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

// export default ShowList_zarz;
export default ShowList_zarz;
