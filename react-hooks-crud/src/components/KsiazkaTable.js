import React, { useState, useEffect } from 'react';
import './styles.css';
import MaterialTable from "material-table";
import TutorialDataService from "../services/KsiazkaService"
// import axios from 'axios';
//import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const columns = [
  { title: 'Imie', field: 'imie' },
  { title: 'Nazwisko', field: 'nazwisko' },
  { title: 'Adres e-mail', field: 'email' },
  { title: 'Numer telefonu', field: 'numer_tel', type: 'numeric' },
  { title: 'Numer tel. stacj.', field: 'numer_stacj' },
  { title: 'Nazwa działu', field: 'nazwa_dzialu' },
  { title: 'Numer pokoju', field: 'numer_pokoju' }

];

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));

function KsiazkaTable() {
  const styles = useStyles();
  // const [ksiazka_crud, setksiazka_crud] = useState([]);
  const [ksiazka_crud, setksiazka_crud]=useState({
    imie: "",
    nazwisko: "",
    email: "",
    numer_tel: "",
    numer_stacj: "",
    nazwa_dzialu: "",
    numer_pokoju: ""
  })
  // const [currentKsiazka, setCurrentKsiazka] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveKsiazka();
  }, [])

  // const onChangeSearchTitle = e => {
  //   const searchTitle = e.target.value;
  //   setSearchTitle(searchTitle);
  // };


  // const handleChange=e=>{
  //   const {name, value}=e.target;
  //   setArtistaSeleccionado(prevState=>({
  //     ...prevState,
  //     [name]: value
  //   }));
  // }

  const retrieveKsiazka = () => {
    TutorialDataService.getAll()
      .then(response => {
        setksiazka_crud(response.ksiazka_crud);
        console.log(response.ksiazka_crud);
      })
      .catch(e => {
        console.log(e);
      });
  };


  // const findByTitle = () => {
  //   TutorialDataService.findByTitle(searchTitle)
  //     .then(response => {
  //      setksiazka_crud(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };


  return (
    
    <div className="KsiazkaTable">
      <MaterialTable
        columns={columns}
        ksiazka_crud={ksiazka_crud}
        title="Książka adresowa"
        options={{
          search: false
        }}
       
      
      />
    </div>
  );
}

export default KsiazkaTable;