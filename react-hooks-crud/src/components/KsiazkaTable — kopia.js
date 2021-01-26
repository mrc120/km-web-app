import React, { useState, useEffect } from 'react';
import './styles.css';
//import MaterialTable from "material-table";
import TutorialDataService from "../services/KsiazkaService"
import { Link } from "react-router-dom";


// const columns = [
//   { title: 'Imie', field: 'imie' },
//   { title: 'Nazwisko', field: 'nazwisko' },
//   { title: 'Adres e-mail', field: 'email' },
//   { title: 'Numer telefonu', field: 'numer_tel', type: 'numeric' },
//   { title: 'Numer tel. stacj.', field: 'numer_stacj' },
//   { title: 'Nazwa działu', field: 'nazwa_dzialu' },
//   { title: 'Numer pokoju', field: 'numer_pokoju' }

// ];

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)'
//   },
//   iconos: {
//     cursor: 'pointer'
//   },
//   inputMaterial: {
//     width: '100%'
//   }
// }));

const KsiazkaTable = () => {
  //const styles = useStyles();
  const [ksiazka_emp, setksiazka_emp] = useState([]);

  useEffect(() => {
    retrieveKsiazka();
    //loadUsers();
  }, []);

  const retrieveKsiazka = () => {
    TutorialDataService.getAll()
      .then(response => {
        setksiazka_emp(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const loadUsers = () => {
  //   const result = axios.get("http://localhost:8080/ksiazka");
  //   setksiazka_emp(result.data.reverse());
  // };
  // const deleteUser = async id => {
  //   await axios.delete(`http://localhost:8080/ksiazka/${id}`);
  //   loadUsers();
  // };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ksiazka_emp.map((ksiazka_emp, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{ksiazka_emp.imie}</td>
                <td>{ksiazka_emp.nazwisko}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/ksiazka/1`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/ksiazka/1`}
                  >
                    Edit
                  </Link>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KsiazkaTable;