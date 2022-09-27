import React, { useState, useEffect } from "react";
import axios from "axios";
import FilesService from '../services/files.service'
import { Link } from "react-router-dom";

import Modal from '../components/Modal.js';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container } from "react-bootstrap";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "@material-ui/lab/Pagination";


const ShowList_zarz = () => {

  const [entries, setEntries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState( 15);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const SRV_URL = "http://localhost:8080"

  const retrieveTutorials = () => {
    const params = getRequestParams(searchText, page, pageSize);
    FilesService.getAll(params)
      .then((response) => {
        const { entries, totalPages } = response.data;
        setEntries(entries);
        setCount(totalPages);
        // console.log(entries);
      }).catch((e) => {
        console.log(e);
      });
  }

  useEffect(retrieveTutorials, [page, pageSize]);

  const deleteFile = (id) => {
    axios.delete(SRV_URL + `/api/files_zarz/${id}`)
      .then(response => {
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    window.location.reload(true);
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





  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchText(searchText);
  };


  const handlePageChange = (e, value) => {
    setPage(value);
  }

  // const handlePageSizeChange = (e) => {
  //   setPageSize(e.target.value);
  //   setPage(1);
  // }


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

  return (
    <>
      <div className="mainpanel mt">
        <div class="content">
          <Container fluid>
            <Box
              component="form"
              sx={{
                width: 450
              }}
              noValidate
              autoComplete="on">
              <TextField
                id="standard-basic"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="search"
                label={" "}

                variant="outlined"
                onKeyPress={retrieveTutorials}
                placeholder="Wyszukaj..."
                InputLabelProps={{ shrink: true }}
                InputProps={{

                  sx: {
                    "&::placeholder": {
                      color: "green"
                    }
                  },
                  style: { fontSize: 16, height: 50, width: 450, left: 394 + "px", position: "absolute", top: -73 },
                  startAdornment: (
                    <InputAdornment position="start" fontSize="small">
                      <SearchIcon style={{ fontSize: 20, color: '#000000' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <div class="row">
              {entries &&
                entries.map((poz, index) => {
                  return (
                    <div class="col-md-3">
                      <div class="card ">
                        <div class="container">
                          <div class="row px-0">
                            <div class="col-sm-10 ">
                              <div class="h4u" data-id={poz.id}>{poz.title}</div>
                              <hr class="solid"></hr>
                              <div class="h5u">{poz.description}</div>
                            </div>
                            <div class="col-sm-2 flex-column px-0 btn-group">
                              <Button style={{ margin: '-1px -1px -1px 0' }}
                                className="d-flex align-items-center justify-content-center border-bottom  rounded-top rounded-bottom-left-1 rounded-bottom-0   px-0 "
                                target="_blank" onChange={open}
                                href={SRV_URL + "/api/files_zarz/" + poz.name} >
                                <i class="nc-icon nc-cloud-download-93 size-up-down "></i>
                              </Button>
                              <Button style={{ margin: '0 -1px 1px 0'}} className="d-flex align-items-center justify-content-center rounded-top-0  rounded-0 px-0"
                                target="_blank" onChange={open}
                                href={SRV_URL + "/api/files_zarz/" + poz.nameAtt} >
                                <i class="nc-icon nc-attach-87 size-up-down"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                       <div class="col-sm px-0 ml-3 ">
                            <Link style={{ margin: '-1px 0 0 px'}} className="btn form-control px-0 btn-danger border-right border-bottom border-left rounded-0"
                              to={`/u/files_zarz/${poz.id}`}>
                              Edytuj
                            </Link>
                          </div>
                          <div class="col-sm px-0 mr-3 ">
                            <Button style={{ margin: '-1px 0 -1px 0px' }} className="btn col-12 btn-block w-100 form-control pd-5 btn btn-danger border-right border-bottom rounded-0"
                              onClick={()=> handleShow()}>
                              Usuń
                            </Button>
                          </div>

                       <Modal  show={show} handleClose={handleClose} handleShow={handleShow} />

                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="mt-0">
              <ThemeProvider theme={theme}>
                <Pagination
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

export default ShowList_zarz;
