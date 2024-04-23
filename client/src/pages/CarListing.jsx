import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import axios from "axios"; // Import axios

const CarListing = () => {
  const [sortBy, setSortBy] = useState(""); // Состояние для хранения выбранного значения сортировки
  const [cars, setCars] = useState([]); // Состояние для хранения данных об автомобилях

  // Функция для обработки изменений в выпадающем списке
  const handleSortChange = (e) => {
    setSortBy(e.target.value); // Обновляем состояние sortBy при изменении выбранного значения
  };

  // Функция для сортировки массива автомобилей
  const sortCars = (cars, sortBy) => {
    if (sortBy === "low") {
      return cars.slice().sort((a, b) => a.price - b.price); // Сортировка от дешевых к дорогим
    } else if (sortBy === "high") {
      return cars.slice().sort((a, b) => b.price - a.price); // Сортировка от дорогих к дешевым
    } else if (sortBy === "alpha") {
      return cars.slice().sort((a, b) => a.brand.localeCompare(b.brand)); // Сортировка по алфавиту (марка автомобиля)
    } else {
      return cars; // Возвращаем исходный массив, если нет выбранной сортировки
    }
  };

  useEffect(() => {
    // Выполнить запрос при монтировании компонента
    axios
      .get("http://localhost:3307/cars")
      .then((response) => {
        setCars(response.data); // Установка полученных данных в состояние
      })
      .catch((error) => {
        console.error("Error while fetching cars:", error);
      });
  }, []); // Пустой массив зависимостей означает, что эффект будет выполнен только один раз при монтировании

  const sortedCars = sortCars(cars, sortBy); // Отсортированный массив автомобилей в соответствии с текущим значением сортировки

  return (
    <Helmet title="Cars">
      <CommonSection title="Наши автомобили" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Сортировать по
                </span>

                <select onChange={handleSortChange}>
                  <option>По умолчанию</option>
                  <option value="low">Сначала дешевые</option>
                  <option value="high">Сначала дорогие</option>
                  <option value="alpha">По алфавиту (марка автомобиля)</option>
                </select>
              </div>
            </Col>

            {/* Отображение отсортированных элементов CarItem */}
            {sortedCars.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
