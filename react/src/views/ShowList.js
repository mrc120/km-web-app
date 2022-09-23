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
import { CardBody } from "reactstrap";

const ShowList = () => {

  const [entries, setEntries] = useState({ data: [] });

  const URL = "http://localhost:8080/api/files/"

  useEffect(() => {
    axios.get(URL).then(response => {
      let data = response.data
      setEntries({ data: data });
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  function base64ToArrayBuffer(data) {
    const bString = window.atob(data);
    const bLength = bString.length;
    const bytes = new Uint8Array(bLength);
    for (let i = 0; i < bLength; i++) {
        bytes[i] = bString.charCodeAt(i);
    }
    return bytes;
  }
  function base64toPDF(base64EncodedData, fileName = 'file') {
    const bufferArray = base64ToArrayBuffer(base64EncodedData);
    const blobStore = new Blob([bufferArray], { type: 'application/pdf' });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobStore);
        return;
    }
    const data = window.URL.createObjectURL(blobStore);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = data;
    link.download = `${fileName}.pdf`;
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
  }

  return (
    <>
      <div className="mainpanel">
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Body>
                  <ul>
                    <Row >
                      {entries.data.map((poz, index) => {
                        console.log(poz);
                        return (
                          <Col
                            md={{ span: 4 }}>
                            <Card className="ojej">
                              <div>
                                <div class="row">
                                  <div class="col-sm-10 tekst">
                                    <td>{poz.title}</td>
                                  </div>
                                  <div class="col-sm-1">
                                    <Button className="btn-show" target= "_blank" onChange={open} href={URL + poz.name} >
                                      <i class="nc-icon nc-cloud-download-93  size-up-down" ></i>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        )
                      })}
                    </Row>
                  </ul>
                  <div className="clearfix"></div>
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
