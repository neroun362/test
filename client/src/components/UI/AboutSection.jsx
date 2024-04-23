import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = () => {
  return (
    <section className="about__section" style={{ marginTop: "100px" }}>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">О нас</h4>

              <p className="section__description">
                <hr />
                Добро пожаловать в премиум интернет-магазин проката автомобилей!
                Мы гордимся представить вам уникальный мир эксклюзивных
                автомобилей, доступных в аренду в любое время и для любых целей.
                Наш интернет-магазин проката премиум авто – это не просто пункт
                аренды, это источник великолепных возможностей для вашего
                комфорта и стиля.
              </p>
              <h2 className="section__title">Почему именно мы?</h2>

              <div className="about__section-item">
                <p className="section__description">
                  <i className="ri-checkbox-circle-line"></i>{" "}
                  <strong>Эксклюзивный выбор:</strong> Мы предлагаем широкий
                  ассортимент самых модных, роскошных и уникальных автомобилей,
                  созданных для того, чтобы удовлетворить самые изысканные
                  вкусы.
                </p>

                <p className="section__description">
                  <i className="ri-checkbox-circle-line"></i>{" "}
                  <strong>Качество и надежность:</strong> Мы тщательно подбираем
                  каждый автомобиль в нашем парке, чтобы обеспечить нашим
                  клиентам только лучшие впечатления от вождения. Все наши
                  автомобили регулярно проходят техническое обслуживание и
                  проверку перед каждой арендой, чтобы гарантировать
                  безопасность и комфорт наших клиентов.
                </p>
              </div>

              <div className="about__section-item">
                <p className="section__description">
                  <i className="ri-checkbox-circle-line"></i>{" "}
                  <strong>Превосходное обслуживание:</strong> Наша команда
                  профессиональных консультантов готова оказать вам
                  исключительный сервис, отвечая на ваши вопросы, помогая
                  выбрать подходящий автомобиль и обеспечивая поддержку на
                  протяжении всего периода аренды.
                </p>

                <p className="section__description">
                  <i className="ri-checkbox-circle-line"></i>{" "}
                  <strong>Гибкие условия аренды:</strong> Мы ценим ваше время и
                  комфорт, поэтому предлагаем гибкие условия аренды,
                  адаптированные под ваши потребности. Мы готовы предложить вам
                  выгодные тарифы, специальные предложения и индивидуальные
                  условия, чтобы сделать вашу аренду максимально удобной и
                  выгодной.
                </p>
              </div>
              <p className="section__description">
                Приглашаем вас в мир роскоши и удовольствия с премиум
                интернет-магазином проката автомобилей. Доверьте нам ваше
                вождение, и мы сделаем ваше путешествие незабываемым!
                <hr />
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
