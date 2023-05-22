import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container } from "react-bootstrap";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { defaults } from "browserslist";

import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "@material-ui/lab/Pagination";

import useFetch from "../../hooks/useFetch"
import useAuth from "../../hooks/useAuth"


const ShowList_podst = () => {

  const baseURL = "http://localhost:8080/api/files_podst"


  const { showAdminBoard, showAddUserBoard, showFileUploadBoard,
    currentUser, logOut } = useAuth();

  const { data } = useFetch("http://localhost:8080/api/files_podst")
  const sortedData = [...data].sort((a, b) => data.id > data.id ? 1 : -1)

  useEffect(() => {
    console.log(data);
  });


  return (
    <>
      <div className="mainpanel mt">
        <div className="content">
          <Container fluid>
{/*            
              <TextField
                className={classes.input}
                id="standard-basic"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                variant="outlined"
                onKeyUp={data}
                placeholder="Wyszukaj..."
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  style: { fontSize: 16, height: 50, width: 450, left: 299, position: "absolute", top: -73 }, startAdornment: (
                    <InputAdornment position="start" fontSize="small">
                      <SearchIcon style={{ fontSize: 20, color: '#000000' }} />
                    </InputAdornment>
                  ),
                }}
              /> */}
        
            <div className="row">
              {sortedData &&
                sortedData.map((poz) => {
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
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ShowList_podst;
