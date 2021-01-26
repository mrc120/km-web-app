import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/KsiazkaService";

const Ksiazka = props => {
  const initialTutorialState = {
    id: null,
    imie: "",
    nazwisko: "",
    adres_email: "",
    numer_tel: "",
    numer_stacj: "",
    nazwa_dzialu: "",
    numer_pokoju: "",
    published: false
  };
  const [currentKsiazka, setCurrentKsiazka] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getKsiazka = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentKsiazka(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
      getKsiazka(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentKsiazka({...currentKsiazka, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentKsiazka.id,
      imie: currentKsiazka.imie,
      nazwisko: currentKsiazka.nazwisko,
      adres_email: currentKsiazka.adres_email,
      numer_tel: currentKsiazka.numer_tel,
      numer_stacj: currentKsiazka.numer_stacj,
      nazwa_dzialu: currentKsiazka.nazwa_dzialu,
      symbol_dzialu: currentKsiazka.symbol_dzialu,
      numer_pokoju: currentKsiazka.numer_pokoju,
      published: status
    };

    TutorialDataService.update(currentKsiazka.id, data)
      .then(response => {
        setCurrentKsiazka({ ...currentKsiazka, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateKsiazka = () => {
    TutorialDataService.update(currentKsiazka.id, currentKsiazka)
      .then(response => {
        console.log(response.data);
        setMessage("Książka została poprawnie zaktualizowana");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteKsiazka = () => {
    TutorialDataService.remove(currentKsiazka.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/ksiazka");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentKsiazka ? (
        <div className="edit-form">
          <h4>Edytuj pracownika</h4>
          <form>
            <div className="form-group">
              <label htmlFor="imie">Imię</label>
              <input
                type="text"
                className="form-control"
                id="imie"
                name="imie"
                value={currentKsiazka.imie}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nazwisko">Nazwisko</label>
              <input
                type="text"
                className="form-control"
                id="nazwisko"
                name="nazwisko"
                value={currentKsiazka.nazwisko}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="adres_email">adres e-mail</label>
              <input
                type="text"
                className="form-control"
                id="adres_email"
                name="adres_email"
                value={currentKsiazka.adres_email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="numer_tel">Numer telefonu komórkowego</label>
              <input
                type="text"
                className="form-control"
                id="numer_tel"
                name="numer_tel"
                value={currentKsiazka.numer_tel}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="numer_stacj">Numer telefonu stacjonarnego</label>
              <input
                type="text"
                className="form-control"
                id="numer_stacj"
                name="numer_stacj"
                value={currentKsiazka.numer_tel}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="adres_email">Adres e-mail</label>
              <input
                type="text"
                className="form-control"
                id="adres_email"
                name="adres_email"
                value={currentKsiazka.adres_email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nazwa_dzialu">Nazwa działu</label>
              <input
                type="text"
                className="form-control"
                id="nazwa_dzialu"
                name="nazwa_dzialu"
                value={currentKsiazka.nazwa_dzialu}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="numer_pokoju">Numer pokoju</label>
              <input
                type="text"
                className="form-control"
                id="numer_pokoju"
                name="numer_pokoju"
                value={currentKsiazka.numer_pokoju}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="symbol_dzialu">Symbol działu</label>
              <input
                type="text"
                className="form-control"
                id="symbol_dzialu"
                name="symbol_dzialu"
                value={currentKsiazka.symbol_dzialu}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Widoczność</strong>
              </label>
              {currentKsiazka.published ? "Widoczny" : "Ukryty"}
            </div>
          </form>

          {currentKsiazka.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              Odpublikuj
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publikuj
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteKsiazka}>
            Usuń
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateKsiazka}
          >
            Aktualizuj
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Ksiazka adresowa kliknij na mnie</p>
        </div>
      )}
    </div>
  );
};

export default Ksiazka;
