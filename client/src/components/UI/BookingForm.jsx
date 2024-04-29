import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Col, Form, FormGroup, Row } from "reactstrap";
import { Link } from "react-router-dom";
import PaymentMethod from "./PaymentMethod";
import { useAuthContext } from "../../context/AuthContext";
import Axios from "axios";
import { toastMessage } from "../../utils/toastMessage";

const BookingForm = ({ car_id }) => {
  const [rentInformation, setRentInformation] = useState({
    rentData: "",
    rentTime: "",
    comments: "",
    selectedPayment: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false); // Состояние для отслеживания отправки формы

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRentInformation((prevRentInformation) => ({
      ...prevRentInformation,
      [name]: value,
    }));
  };

  const authContext = useAuthContext();

  const rentCar = async (event) => {
    event.preventDefault();
    if (!rentInformation.selectedPayment) {
      toastMessage("Выберите способ оплаты", "error");
      return;
    }

    const rentData = {
      user_id: authContext.user.user_id,
      car_id: car_id,
      rentData: rentInformation.rentData,
      rentTime: rentInformation.rentTime,
      comments: rentInformation.comments,
      selectedPayment: rentInformation.selectedPayment,
    };

    try {
      await Axios.post("http://localhost:3307/rentCar", rentData);
      toastMessage("Машина уже почти у Вас!👍");
      setRentInformation({
        rentData: "",
        rentTime: "",
        comments: "",
        selectedPayment: "",
      });
      setFormSubmitted(true); // Устанавливаем значение formSubmitted в true после успешной отправки формы
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  // Функция обратного вызова для обновления выбранного метода оплаты
  const handlePaymentChange = (paymentMethod) => {
    setRentInformation((prevRentInformation) => ({
      ...prevRentInformation,
      selectedPayment: paymentMethod,
    }));
  };

  // Обработчик события для сброса состояния выбора радиокнопок
  const handleFormReset = () => {
    setFormSubmitted(false);
  };

  return (
    <Row>
      <Col lg="7">
        <div className="booking-form-container">
          <Form onSubmit={rentCar}>
            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input
                type="date"
                placeholder="Journey Date"
                name="rentData"
                value={rentInformation.rentData}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <input
                type="time"
                placeholder="Journey Time"
                className="time__picker"
                name="rentTime"
                value={rentInformation.rentTime}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <textarea
                rows={5}
                type="textarea"
                className="textarea"
                placeholder="Комментарии"
                name="comments"
                value={rentInformation.comments}
                onChange={handleInputChange}
              ></textarea>
            </FormGroup>

            <div className="payment text-end mt-5">
              <button onClick={handleFormReset}>Арендовать</button>
            </div>
            <div>
              <Link to="/contact" className="d-flex align-items-center gap-2">
                <span>Остались вопросы?</span>
              </Link>
            </div>
          </Form>
        </div>
      </Col>

      <Col lg="5">
        <div className="payment__info mt-5">
          <h5 className="mb-3 fw-bold">Способ оплаты</h5>
          {/* Передаем функцию обратного вызова в компонент PaymentMethod */}
          <PaymentMethod
            onPaymentChange={handlePaymentChange}
            formSubmitted={formSubmitted} // Передаем состояние formSubmitted в компонент PaymentMethod
          />
        </div>
      </Col>
    </Row>
  );
};

export default BookingForm;
