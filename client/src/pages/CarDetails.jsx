import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";

const CarDetails = () => {
  const { slug } = useParams();
  const [carDetails, setCarDetails] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  useEffect(() => {
    // Выполнить запрос при монтировании компонента
    axios
      .get("http://localhost:3307/cars")
      .then((response) => {
        setCarDetails(response.data); // Установка полученных данных в состояние
      })
      .catch((error) => {
        console.error("Error while fetching cars:", error);
      });
  }, [slug]);

  const car = carDetails.find((item) => item.carName === slug);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="6">
            <img src={car.imgUrl} alt="" className="w-100" />
          </Col>

          <Col lg="6">
            <div className="car__info">
              <h2 className="section__title">{car.carName}</h2>
              <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                <h6 className="rent__price fw-bold fs-4">
                  {car.price} BYN / День
                </h6>
              </div>
              <p className="section__description">{car.description}</p>
              <div
                className=" d-flex align-items-center mt-3"
                style={{ columnGap: "4rem" }}
              >
                <span className=" d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-roadster-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {car.model}
                </span>
                <span className=" d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-settings-2-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {car.automatic}
                </span>
                <span className=" d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-flashlight-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {car.power}
                </span>
              </div>
              <div
                className=" d-flex align-items-center mt-3"
                style={{ columnGap: "2.8rem" }}
              >
                <span className=" d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-map-pin-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {car.gps}
                </span>

                <span className=" d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-building-2-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {car.brand}
                </span>
              </div>
            </div>
          </Col>

          <Col lg="10" className="mt-5">
            <div className="booking-info mt-5">
              <h5 className="mb-4 fw-bold ">Информация о бронировании</h5>
              <BookingForm
                car_id={car.car_id}
                selectedPayment={selectedPayment} // Передаем выбранный способ оплаты
                setSelectedPayment={setSelectedPayment} // Передаем функцию для обновления выбранного способа оплаты
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarDetails;
