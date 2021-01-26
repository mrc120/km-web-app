import React, { useState, useEffect } from 'react';
import './styles.css';
import TutorialDataService from "../services/KsiazkaService"
import { Link } from "react-router-dom";

import { forwardRef } from 'react';
//import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function KsiazkaTable() {
  const [data, setData] = useState([]); //table data
  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  var columns = [
    { title: 'Lp.', field: 'id'},
    { title: 'Imie', field: 'imie' },
    { title: 'Nazwisko', field: 'nazwisko' },
    { title: 'Adres e-mail', field: 'adres_email' },
    { title: 'Numer telefonu', field: 'numer_tel', type: 'numeric' },
    { title: 'Numer tel. stacj.', field: 'numer_stacj' },
    { title: 'Nazwa działu', field: 'nazwa_dzialu' },
    { title: 'Symbol działu', field: 'symbol_dzialu' },
    { title: 'Numer pokoju', field: 'numer_pokoju' }, ]
  // const loadUsers = () => {
  //   const result = axios.get("http://localhost:8080/ksiazka");
  //   setksiazka_emp(result.data.reverse());
  // const api = axios.create({
  //   baseURL: `http://localhost:8080/api`
  // })
  useEffect(() => {
    // api.get("/ksiazka")
    // .then(res => {
    //   setData(res.data.data)
    // })
    // // .catch(error=>{
    // //   setErrorMessage(["Cannot load user data"])
    // //   setIserror(true)
    // // })
    retrieveKsiazka();
}, [])


  const retrieveKsiazka = () => {
    TutorialDataService.getAll()
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="ksiazkatable">

      <Grid container spacing={3}>
        <Grid item xs={5}></Grid>
        <Grid item xs={12}>
        <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
          <MaterialTable
            title="Książka Adresowa"
              columns={columns}
              data={data}
            icons={tableIcons}
  //           data={query =>
  //             new Promise((resolve, reject) => {
  //               let url = 'http://localhost:8080/ksiazka?'
  //               url += 'per_page=' + query.pageSize
  //               url += '&page=' + (query.page + 1)
  //               fetch(url)
  //                 .then(response => response.json())
  //                 .then(result => {
  //                   resolve({
  //                     data: result.data,
  //                     page: result.page - 1,
  //                     totalCount: result.total,
  //         })
  //       })
  //   })
  // }
/>
       
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </div>
  );
}

export default KsiazkaTable;