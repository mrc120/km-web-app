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

  // let imagesPreview = function(input, placeToInsertImagePreview) {
  //   if (input.files) {
  //     let filesAmount = input.files.length;
  //     for (i = 0; i < filesAmount; i++) {
  //       let reader = new FileReader();
  //       reader.onload = function(event) {
  //         $($.parseHTML("<img>"))
  //           .attr("src", event.target.result)
  //           .appendTo(placeToInsertImagePreview);
  //       };
  //       reader.readAsDataURL(input.files[i]);
  //     }
  //   }
  // };

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
                          <form action="/multiple-upload" method="POST" enctype="multipart/form-data">
                            <div class="form-group">
                              <label for="example-input-file"> </label>
                              <input type="file" name="multi-files" multiple id="input-multi-files" class="form-control-file border" />
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
                    {/* <Button
                      onClick={() => {
                        notify();
                        saveEmployee();
                      }}
                      className="btn-fill btn-padding btn-fix"
                      variant="info">
                      Dodaj
                    </Button> */}
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
