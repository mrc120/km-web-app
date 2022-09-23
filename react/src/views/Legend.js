import React from "react";
import 'assets/css/mainpanel.css';
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Legend() {
  return (
    <>
      <div className="mainpanel">
        <Container fluid>
          <Row>
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
                            <b>Nowa Hala</b> jest oznaczony za pomocą numeru <b>2.x</b>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="nc-icon nc-stre-right" />
                          </td>
                          <td>
                            <b>Stara Hala</b> jest oznaczony za pomocą numeru <b>3.x</b>
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
                  <div className="table-full-width">
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
                            Możliwość wyszukania po każdej kolumnie czyli: nazwie, adresie e-mail, numerze telefonu stacjonarnego, numerze komórkowym,
                            nazwie działu, za pomocą symbolu, za pomocą numeru pokoju
                        </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    Zaktualizowano 22.04.2021r.
                </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Legend;
