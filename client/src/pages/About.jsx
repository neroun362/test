import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";

import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="О нас" />
      <AboutSection />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  Мы стремимся предоставить решения для безопасной езды
                </h2>

                <p className="section__description">
                  Наш магазин предлагает широкий ассортимент продуктов и услуг,
                  направленных на обеспечение безопасности вождения вашего
                  премиум автомобиля. Мы предлагаем только самые надежные и
                  качественные товары, включая системы безопасности, аксессуары
                  для защиты автомобиля, а также услуги по установке и
                  обслуживанию.
                </p>

                <p className="section__description">
                  Наша команда экспертов всегда готова помочь вам выбрать
                  оптимальное решение для вашего автомобиля, чтобы вы могли
                  наслаждаться безопасной и комфортной поездкой в любое время.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i className="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Нужна помощь?</h6>
                    <h4>+375(29)1112233</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <BecomeDriverSection />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Наши сотрудники</h6>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
