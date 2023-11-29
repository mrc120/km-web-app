import React from "react";
import 'assets/css/mainpanel.css';
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const Legend = () => {
  return (
    <div className="mainpanel">
      <Container fluid>
        <Row className="d-flex justify-content-center">
          <Col md="5">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Symbole</Card.Title>
                <p className="card-category">Oznaczenia numeru budynków w kolumnie 'numer pokoju' </p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <i className="nc-icon nc-stre-right" />
                        </td>
                        <td>
                          <b>Budynek B</b> jest oznaczony za pomocą numeru <b>1.x</b>
                        </td>
                        <td className="td-actions text-right">
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="nc-icon nc-stre-right" />
                        </td>
                        <td>
                          <b>Nowa Hala</b> jest oznaczona za pomocą numeru <b>2.x</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="nc-icon nc-stre-right" />
                        </td>
                        <td>
                          <b>Stara Hala</b> jest oznaczona za pomocą numeru <b>3.x</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="nc-icon nc-stre-right" />
                        </td>
                        <td>
                          <b>Budynek A</b> jest oznaczony za pomocą numeru <b>4.x</b>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="5" className="font-icon-list">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Wyszukiwarka</Card.Title>
                <p className="card-category">Sposób działania funkcji szukania w tabeli</p>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <i className="nc-icon nc-stre-right" />
                        </td>
                        <td>
                          Klikamy na pole <b>Wyszukaj</b> i wpisujemy szukaną treść
                        </td>
                        <td className="td-actions text-right">
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="nc-icon nc-stre-right" />
                        </td>
                        <td>
                          Możliwość wyszukania po wszystkich kolumnach: nazwie, adresie e-mail, numerze telefonu stacjonarnego, numerze komórkowym,
                          nazwie działu, za pomocą symbolu, za pomocą numeru pokoju
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="nc-icon nc-stre-right" />
                        </td>
                        <td>
                          W przypadku błędu <b>prosimy o kontakt</b>
                        </td>
                        <td className="td-actions text-right">
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>

            </Card>
          </Col>
          <Card className="card-tasks">
            <Card.Header>
              <Card.Title as="h4">Sekcja plików: Uchwały, Podstawy prawne, Zarządzenia</Card.Title>
              <p className="card-category">Sposób wyświetlania oraz możliwości</p>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <i className="nc-icon nc-stre-right" />
                      </td>
                      <td>
                        Sekcję podzielono na trzy części: <b>Uchwały, Podstawy Prawne, Zarządzenia</b>
                      </td>
                      <td className="td-actions text-right">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="nc-icon nc-stre-right" />
                      </td>
                      <td>
                        W podanych sekcjach udostepniane są pliki .PDF oraz załączniki dla których jest możliwość swobodnego podglądu
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="nc-icon nc-stre-right" />
                      </td>
                      <td>
                        Aby <b>wyświetlić</b> interesujący nas plik należy <b>kliknąć po prawej stronie wybranej pozycji ikonę strzałki z chmurką</b>
                      </td>
                      <td className="td-actions text-right">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="nc-icon nc-stre-right" />
                      </td>
                      <td>
                        Aby <b>pobrać</b> dołączony załącznik należy <b>kliknąć ikonę spinacza.</b>
                      </td>
                      <td className="td-actions text-right">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="nc-icon nc-stre-right" />
                      </td>
                      <td>
                        Dokument zostanie wyświetlony domyślnie w oknie przeglądarki. Ponadto jest <b>możliwość pobrania oraz wydruku dokumentu</b>
                      </td>
                      <td className="td-actions text-right">
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="nc-icon nc-stre-right" />
                      </td>
                      <td>
                        Obsługiwane są zaszyfrowane pliki. Jeśli plik posiada hasło to przed wyświetleniem użytkownik zostanie o nie poproszony
                      </td>
                      <td className="td-actions text-right">
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default Legend;
