import React, { useState, useEffect } from "react";
import "../../styles/payment-method.css";
import all from "../../assets/all-images/all.png";

const PaymentMethod = ({ onPaymentChange, formSubmitted }) => {
  const [selectedPayment, setSelectedPayment] = useState("");

  useEffect(() => {
    // Сброс выбора радиокнопок при успешной отправке формы
    if (formSubmitted) {
      setSelectedPayment("");
    }
  }, [formSubmitted]);

  const handlePaymentChange = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    onPaymentChange(paymentMethod); // Вызываем функцию обратного вызова для передачи выбранного метода оплаты
  };

  return (
    <>
      <div className="payment">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={selectedPayment === "Банковской картой онлайн"}
            onChange={() => handlePaymentChange("Банковской картой онлайн")}
          />{" "}
          Банковской картой онлайн
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={selectedPayment === "Банковской картой при получении"}
            onChange={() =>
              handlePaymentChange("Банковской картой при получении")
            }
          />{" "}
          Банковской картой при получении
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input
            type="radio"
            checked={selectedPayment === "Наличными"}
            onChange={() => handlePaymentChange("Наличными")}
          />{" "}
          Наличными
        </label>
      </div>
      <br />

      <div>
        <img src={all} alt="" style={{ width: "300px", height: "auto" }} />
      </div>
    </>
  );
};

export default PaymentMethod;
