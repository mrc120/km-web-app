import React, { useState, useEffect } from "react";
import NotificationAlert from "react-notification-alert";

import axios from "axios";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const ShowList = () => {

  const [entries, setEntries] = useState({ data: [] });

  const lista = [
    {
      name: '',
      url: ''
    }
  ]

  const URL = "http://localhost:8080/files/"

  useEffect(() => {
    axios.get(URL).then(response => {
      let data = response.data
      setEntries({ data: data });
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <>
      <div className="mainpanel">
        <Container fluid>
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Dodaj plik</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <div class="row">
                        <div class="col-sm-8 mt-3">
                          <form action="/upload" method="POST" enctype="multipart/form-data">
                            <div class="form-group">
                              <label for="example-input-file"> </label>
                              <input type="file" name="multi-files" class="form-control-file border" />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                          </form>
                        </div>
                      </div>
                      <hr />
                      {/* <div class="row">
                        <div class="col-sm-12">
                          {/* <div class="preview-images"></div> */}

                    </Row>
                    <Row>
                      <h4>SHOW LIST</h4>
                      <ul>
                        {
                          entries.data.map((poz, index) => {
                            console.log(poz);
                            return (
                              <Card>
                              <div>
                                <h2 className='poz'>{poz.name}</h2>
                                <h5 className="poz_title">{poz.url}</h5>
                              </div>
                          </Card>
                            )
                          })}
                      </ul>
                    </Row>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ShowList;
