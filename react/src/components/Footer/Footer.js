import React, { Component } from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
      <footer className="footer px-2 px-lg-3">
        <Container fluid>
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="mailto: krzysztof.mikolajczyk@kmplock.eu">
                  Zgłoś błąd
                </a>
              </li>
            </ul>
            <p className="copyright text-center">
              ©{new Date().getFullYear()}{" "}
              <a href="mailto:krzysztof.mikolajczyk@kmplock.eu">Krzysztof Mikołajczyk</a>, dla KM Płock Sp. z o.o.
            </p>
          </nav>
        </Container>
      </footer>
    );
  }

export default Footer;
