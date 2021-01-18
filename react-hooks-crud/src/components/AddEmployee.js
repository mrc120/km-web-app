import React, { useState } from "react";
import TutorialDataService from "../services/KsiazkaService";

const AddEmployee = () => {
  const initialTutorialState = {
    id: null,
    imie: "",
    nazwisko: "",
    adres_email: "",
    numer_tel: "",
    nazwa_dzialu: "",
    numer_pokoju: "",
    published: false
  };

  const [ksiazka, setEmployee] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployee({ ...ksiazka, [name]: value });
  };

  const saveEmployee = () => {
    var data = {
      imie: ksiazka.imie,
      nazwisko: ksiazka.nazwisko,
      adres_email: ksiazka.adres_email,
      numer_tel: ksiazka.numer_tel,
      numer_stacj: ksiazka.numer_stacj,
      numer_pokoju: ksiazka.numer_pokoju,
      nazwa_dzialu: ksiazka.nazwa_dzialu
    };

    TutorialDataService.create(data)
      .then(response => {
        setEmployee({
          id: response.data.id,
          imie: response.data.imie,
          nazwisko: response.data.nazwisko,
          adres_email: response.data.adres_email,
          numer_tel: response.data.numer_tel,
          numer_stacj: response.data.numer_stacj,
          nazwa_dzialu: response.data.nazwa_dzialu,
          numer_pokoju: response.data.numer_pokoju,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEmployee = () => {
    setEmployee(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Dodano pomyslnie!</h4>
          <button className="btn btn-success" onClick={newEmployee}>
            Dodaj
          </button>
        </div>
      ) : (
        <div>
         <div className="form-group">
            <label htmlFor="imie">Imie</label>
            <input
              type="text"
              className="form-control"
              id="imie"
              required
              value={ksiazka.imie}
              onChange={handleInputChange}
              name="imie"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nazwisko">Nazwisko</label>
            <input
              type="text"
              className="form-control"
              id="nazwisko"
              required
              value={ksiazka.nazwisko}
              onChange={handleInputChange}
              name="nazwisko"
            />
          </div>

          <div className="form-group">
            <label htmlFor="adres_email">Adres e-mail</label>
            <input
              type="text"
              className="form-control"
              id="adres_email"
              required
              value={ksiazka.adres_email}
              onChange={handleInputChange}
              name="adres_email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="numer_tel">Numer telefonu</label>
            <input
              type="text"
              className="form-control"
              id="numer_tel"
              required
              value={ksiazka.numer_tel}
              onChange={handleInputChange}
              name="numer_tel"
            />
          </div>
          <div className="form-group">
            <label htmlFor="numer_stacj">Numer telefonu stacjonarny</label>
            <input
              type="text"
              className="form-control"
              id="nume_stacj"
              required
              value={ksiazka.numer_stacj}
              onChange={handleInputChange}
              name="numer_stacj"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nazwa_dzialu">Nazwa działu</label>
            <input
              type="text"
              className="form-control"
              id="nazwa_dzialu"
              required
              value={ksiazka.nazwa_dzialu}
              onChange={handleInputChange}
              name="nazwa_dzialu"
            />
          </div>
          <div className="form-group">
            <label htmlFor="numer_pokoju">Numer pokoju</label>
            <input
              type="text"
              className="form-control"
              id="numer_pokoju"
              required
              value={ksiazka.numer_pokoju}
              onChange={handleInputChange}
              name="numer_pokoju"
            />
          </div>
          

          <button onClick={saveEmployee} className="btn btn-success">
            Dodaj
          </button>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
