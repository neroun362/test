import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const quickLinks = [
  {
    path: "/about",
    display: "О нас",
  },

  // {
  //   path: "#",
  //   display: "Privacy Policy",
  // },

  {
    path: "/cars",
    display: "Наши авто",
  },

  // {
  //   path: "/blogs",
  //   display: "Blog",
  // },

  {
    path: "/contact",
    display: "Контакты",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col
            lg="4"
            md="4"
            sm="12"
            className="d-flex align-items-center justify-content-center"
          >
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i className="ri-car-line"></i>
                  <span>
                    Прокат <br /> автомобилей
                  </span>
                </Link>
              </h1>
            </div>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Информация о нас</h5>
              <p className="office__info">
                Беларусь, Витебск, ул. Терешковой, 9В
              </p>
              <p className="office__info">Телефон: +375(29)1112233</p>

              <p className="office__info">Email: carrentVitebsk@gmail.com</p>

              <p className="office__info">Время работы: 8.00 - 20.00</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
