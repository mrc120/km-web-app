import React, { useState, useEffect } from "react";
import KsiazkaDataService from "../services/KsiazkaService";
import NotificationAlert from "react-notification-alert";
import 'react-dropdown/style.css';
import axios from "axios";
import {
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const UserProfile = () => {
  const UserAction = {
    id: null,
    nazwa: "",
    adres_email: "",
    numer_tel: "",
    numer_stacj: "",
    symbol_dzialu: "",
    numer_pokoju: "",
    stanowiskoIdStan: null,
    dzialIdDzialu: null,
  };

  const URLd = "http://localhost:8080/api/dzial"
  const URLdstan = "http://localhost:8080/api/stanowisko"

  const [ksiazka, setEmployee] = useState(UserAction);
  const notificationAlertRef = React.useRef(null);
  const [getDzial, setDzial] = useState({ data: [] });
  const [getStan, setStan] = useState({ data2: [] });


  //byly dwa useeffecty i dwa getty
  useEffect(() => {
    axios.get(URLd)
      .then(res => {
        let data = res.data
        setDzial({ data: data })
        console.log(res.data)
      }).catch(err => { console.log(err) })

    axios.get(URLdstan)
      .then(res => {
        let data2 = res.data
        setDzial({ data: data2 })
        console.log(res.data)
      }).catch(err => { console.log(err) })
  }, []);

  const notify = () => {
    var options = {};
    options = {
      type: 'info',
      place: 'tc',
      message: (
        <div><b>Dodano nowego pracownika!</b></div>
      ),
      icon: "nc-icon nc-bell-55",
      autoDismiss: 55,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const dzial = [
    { value: '0', label: 'Wybierz dział' },
    { value: '1', label: 'Zarząd' },
    { value: '2', label: 'Sekretariat' },
    { value: '3', label: 'Dyrektor' },
    { value: '4', label: 'Dział Przewozów' },
    { value: '6', label: 'Koordynator ds. Rozwoju Transportu' },
    { value: '7', label: 'Dział promocji i Komunikacji Społecznej' },
    { value: '8', label: 'Dział Polityki Kadrowej i Płacowej' },
    { value: '9', label: 'Dział Sprzedaży' },
    { value: '10', label: 'Dział Marketingu' },
    { value: '11', label: 'Dział Sprzedaży' },
    { value: '12', label: 'Dział Finansowo Księgowy' },
    { value: '13', label: 'Biuro Obsługi Zarządu' },
    { value: '14', label: 'Kontroling' },
    { value: '15', label: 'Dział Utrzymania Infrastruktury' },
    { value: '16', label: 'Dzial Obsługi i Napraw Taboru' },
    { value: '17', label: 'Dział Zaopatrzenia i Magazynów' },
    { value: '18', label: 'Sekcja Nadzoru Technicznego' },
    { value: '19', label: 'Dział bezpieczeństwa i Higieny Pracy' },
    { value: '20', label: 'Strefa Płatnego Parkowania' },
    { value: '21', label: 'Dział Utrzymania Infrastruktury Sprzedaży' },
    { value: '22', label: 'Dział Informatyczny' },
  ];

  const stanowisko = [
    { value: '36', label: 'Wybierz stanowisko' },
    { value: '0', label: 'Prezes' },
    { value: '1', label: 'Wiceprezes' },
    { value: '2', label: 'Asystent Zarządu' },
    { value: '3', label: 'Dyrektor' },
    { value: '4', label: 'Kierownik' },
    { value: '6', label: 'Nadzór ruchu' },
    { value: '7', label: 'Dyspozytor-Planista' },
    { value: '8', label: 'Dyspozytor' },
    { value: '9', label: 'Samodzielny Specjalista' },
    { value: '10', label: 'Samodzielny Specjalista-Koordynator' },
    { value: '11', label: 'Specjalista ds. Windykacji' },
    { value: '12', label: 'Kontrolerzy Biletów' },
    { value: '13', label: 'BOK - Jachowicza 42' },
    { value: '14', label: 'BOK - Przemysłowa 17' },
    { value: '15', label: 'Starsza Księgowa' },
    { value: '16', label: 'Księgowa' },
    { value: '17', label: 'Samodzielny Specjalista ds. Kontrolingu i Likwidacji Szkód ' },
    { value: '18', label: 'Specjalista ds. Technicznych' },
    { value: '19', label: 'Referent' },
    { value: '20', label: 'Hydraulik' },
    { value: '21', label: 'Elektryk' },
    { value: '22', label: 'Konserwator' },
    { value: '23', label: 'Myjnia wewnętrzna' },
    { value: '24', label: 'Portiernia' },
    { value: '25', label: 'Mistrzówka Hala 1 ' },
    { value: '26', label: 'Mistrzówka Hala 2 ' },
    { value: '27', label: 'Mistrz' },
    { value: '28', label: 'Linia OC' },
    { value: '29', label: 'Magazyn Techniczny' },
    { value: '30', label: 'Stacja Kontroli Pojazdów' },
    { value: '31', label: 'Starszy Specjalista ds. BHP' },
    { value: '32', label: 'Inspektor ds. BHP' },
    { value: '33', label: 'Kierownik' },
    { value: '34', label: 'Biuro SPP - Kolegialna 3' },
    { value: '35', label: 'Kontroler' },

  ];

  const saveEmployee = () => {
    var data = {
      nazwa: ksiazka.nazwa,
      stanowisko: ksiazka.stanowisko,
      adres_email: ksiazka.adres_email,
      numer_tel: ksiazka.numer_tel,
      numer_stacj: ksiazka.numer_stacj,
      symbol_dzialu: ksiazka.symbol_dzialu,
      numer_pokoju: ksiazka.numer_pokoju,
      nazwa_dzialu: ksiazka.nazwa_dzialu,
      dzialIdDzialu: ksiazka.dzialIdDzialu,
      stanowiskoIdStan: ksiazka.stanowiskoIdStan
    };

    KsiazkaDataService.create(data)
      .then(response => {
        setEmployee({
          id: response.data.id,
          nazwa: response.data.nazwa,
          stanowisko: response.data.stanowisko,
          adres_email: response.data.adres_email,
          numer_tel: response.data.numer_tel,
          numer_stacj: response.data.numer_stacj,
          nazwa_dzialu: response.data.nazwa_dzialu,
          symbol_dzialu: response.data.symbol_dzialu,
          numer_pokoju: response.data.numer_pokoju,
          dzialIdDzialu: response.data.dzialIdDzialu,
          stanowiskoIdStan: response.data.stanowiskoIdStan
        });
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployee({ ...ksiazka, [name]: value });
  };

  return (
    <>
      <div className="mainpanel">
      <div className="ml-1  row p-4 w-100 border bg-white align-items-center  d-flex justify-content-center">
        <div className="Md-5">
          <NotificationAlert ref={notificationAlertRef} />
          <Form>
            <Row>
              <Col className="pr-2" md="6">
                <Form.Group className="Row-fix">
                  <label>Nazwa</label>
                  <Form.Control className="form"
                    type="text"
                    id="nazwa"
                    placeholder="Imię i nazwisko pracownika"
                    value={ksiazka.nazwa}
                    onChange={handleInputChange}
                    name="nazwa"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="pr-1" md="6">
                <Form.Group className="Row-fix">
                  <label>
                    Adres e-mail
                  </label>
                  <Form.Control
                    placeholder="Adres E-mail"
                    type="email"
                    id="adres_email"
                    value={ksiazka.adres_email}
                    onChange={handleInputChange}
                    name="adres_email"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="6">
                <Form.Group className="Row-fix">
                  <label>Numer telefonu komórkowego</label>
                  <Form.Control
                    placeholder="Przykład. xxx xxx xxx"
                    id="numer_stacj"
                    onChange={handleInputChange}
                    value={ksiazka.numer_stacj}
                    name="numer_stacj"
                    type="text"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="pr-1" md="6">
                <Form.Group className="Row-fix">
                  <label>Numer telefonu stacjonarnego</label>
                  <Form.Control
                    placeholder="Przykład. xxx-xx-xx"
                    id="numer_tel"
                    value={ksiazka.numer_tel}
                    onChange={handleInputChange}
                    name="numer_tel"
                    type="text"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="pr-1" md="6"> 
              <Form.Group className="Row-fix">
                <label>Nazwa działu</label>
                <select
                  value={ksiazka.dzialIdDzialu}
                  onChange={handleInputChange}
                  className="Dropdown-c"
                  name="dzialIdDzialu"
                  id="dzialIdDzialu"
                  variant="primary">
                  {dzial.map(({ value, label }, index) =>
                    <option value={value}>{label}</option>)}
                </select>
                </Form.Group>
              </Col>
              <Col className="pr-1 mr-4 flex-sm-row" md="4">
                <Form.Group className="Row-fix">
                  <label>Numer pokoju</label>
                  <Form.Control
                    placeholder="Przykład. 210"
                    id="numer_pokoju"
                    value={ksiazka.numer_pokoju}
                    onChange={handleInputChange}
                    name="numer_pokoju"
                    type="text"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col className="pr-1" md="6"> 
              <Form.Group className="Row-fix">
                <label>Nazwa stanowiska</label>
                <select
                  value={ksiazka.stanowiskoIdStan}
                  onChange={handleInputChange}
                  className="Dropdown-c"
                  name="stanowiskoIdStan"
                  id="stanowiskoIdStan"
                  variant="primary">
                  {stanowisko.map(({ value, label }, index) =>
                    <option value={value}>{label}</option>)}
                </select>
                </Form.Group>
              </Col>
              </Row>
            <Button
              onClick={() => {
                notify();
                saveEmployee();
              }}
              className="btn-fill btn-padding btn-fix"
              variant="info">
              Dodaj
            </Button>
            <div className="clearfix"></div>
          </Form>
        </div>
      </div>
    </div>
    </>
  );
}

export default UserProfile;
