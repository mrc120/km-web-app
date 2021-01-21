import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/KsiazkaService";
import { Link } from "react-router-dom";

const KsiazkaList = () => {
  const [ksiazka_crud, setksiazka_crud] = useState([]);
  const [currentKsiazka, setCurrentKsiazka] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveKsiazka();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveKsiazka = () => {
    TutorialDataService.getAll()
      .then(response => {
        setksiazka_crud(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveKsiazka();
    setCurrentKsiazka(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (ksiazka, index) => {
    setCurrentKsiazka(ksiazka);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setksiazka_crud(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Szukaj po imieniu"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Szukaj
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Ksiazka lista</h4>

        <ul className="list-group">
          {ksiazka_crud &&
            ksiazka_crud.map((ksiazka, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(ksiazka, index)}
                key={index}
              >
                {ksiazka.imie}
              </li>
            ))}
        </ul>

        {<button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Usun wsyzstko
        </button>}
      </div>
      <div className="col-md-6">
        {currentKsiazka ? (
          <div>
            <h4>Ksiazki</h4>
            <div>
              <label>
                <strong>Tytul:</strong>
              </label>{" "}
              {currentKsiazka.imie}
            </div>
            <div>
              <label>
                <strong>Nazwisko:</strong>
              </label>{" "}
              {currentKsiazka.nazwisko}
            </div>
            <div>
              <label>
                <strong>cs:</strong>
              </label>{" "}
              {currentKsiazka.numer_tel}
            </div>
            <div>
              <label>
                <strong>Tytul:</strong>
              </label>{" "}
              {currentKsiazka.nazwa_dzialu}
            </div>
            <div>
              <label>
                <strong>Tytul:</strong>
              </label>{" "}
              {currentKsiazka.adres_email}
            </div>
            <div>
              <label>
                <strong>Tytul:</strong>
              </label>{" "}
              {currentKsiazka.numer_pokoju}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentKsiazka.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/ksiazka/" + currentKsiazka.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default KsiazkaList;
