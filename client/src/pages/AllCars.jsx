import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Button,
  TextField,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
  Typography,
  Box,
} from "@mui/material";
import { toastMessage } from "../utils/toastMessage";

const AllCars = () => {
  const [cars, setCars] = useState([]);

  const [newCar, setNewCar] = useState({
    brand: "",
    carName: "",
    model: "",
    price: "",
    power: "",
    gps: "",
    automatic: "",
    description: "",
    status: "",
    imgUrl: "",
  });
  const [editedCar, setEditedCar] = useState(null);
  const [editedCarData, setEditedCarData] = useState({
    editedPrice: "",
    editedImgUrl: "",
  });
  const [editedStatus, setEditedStatus] = useState(""); // Состояние для редактируемого статуса
  const [searchQuery, setSearchQuery] = useState("");
  const [addingCar, setAddingCar] = useState(false); // State для отслеживания открытия формы добавления автомобиля

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const response = await Axios.get("http://localhost:3307/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Ошибка при получении всех автомобилей:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevNewCar) => ({
      ...prevNewCar,
      [name]: value,
    }));
  };

  const addCar = async () => {
    try {
      await Axios.post("http://localhost:3307/addcar", newCar);
      toastMessage("Автомобиль успешно добавлен!");
      setNewCar({
        brand: "",
        carName: "",
        model: "",
        price: "",
        power: "",
        gps: "",
        automatic: "",
        description: "",
        status: "",
        imgUrl: "",
      });
      fetchAllCars();
      setAddingCar(false); // Закрываем форму после добавления автомобиля
    } catch (error) {
      console.error("Ошибка при добавлении автомобиля:", error);
    }
  };

  const handleEdit = (car) => {
    setEditedCar(car);
    setEditedCarData({
      editedPrice: car.price,
      editedImgUrl: car.imgUrl,
    });
    setEditedStatus(car.status); // Устанавливаем текущий статус для редактирования
  };

  const saveChanges = async () => {
    try {
      // Проверяем, изменились ли данные
      if (
        editedCarData.editedPrice !== editedCar.price ||
        editedCarData.editedImgUrl !== editedCar.imgUrl ||
        editedStatus !== editedCar.status // Включаем проверку изменения статуса
      ) {
        await Axios.put(`http://localhost:3307/updatecar/${editedCar.car_id}`, {
          price: editedCarData.editedPrice,
          imgUrl: editedCarData.editedImgUrl,
          status: editedStatus, // Включаем изменение статуса
        });
        toastMessage("Данные успешно обновлены!");
      }

      setEditedCar(null);
      setEditedCarData({
        editedPrice: "",
        editedImgUrl: "",
      });
      fetchAllCars();
    } catch (error) {
      console.error("Ошибка при обновлении данных автомобиля:", error);
    }
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setEditedStatus(value);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.carName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={3}>
      <h2>Наши автомобили</h2>

      <TextField
        label="Поиск автомобиля"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
      />

      <Button
        onClick={() => setAddingCar(!addingCar)} // При клике на кнопку переключаем состояние addingCar
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
      >
        {addingCar ? "Отменить" : "Добавить автомобиль"}{" "}
        {/* Изменяем текст кнопки в зависимости от состояния addingCar */}
      </Button>

      {addingCar && (
        <Box display="flex" flexDirection="column" maxWidth={400}>
          <h3>Добавить новый автомобиль</h3>
          <TextField
            name="brand"
            label="Бренд"
            value={newCar.brand}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="carName"
            label="Название"
            value={newCar.carName}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="model"
            label="Модель"
            value={newCar.model}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="price"
            label="Цена"
            value={newCar.price}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="power"
            label="Мощность"
            value={newCar.power}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="gps"
            label="GPS"
            value={newCar.gps}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="automatic"
            label="Коробка передач"
            value={newCar.automatic}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="description"
            label="Описание"
            value={newCar.description}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            name="imgUrl"
            label="Изображение"
            value={newCar.imgUrl}
            onChange={handleInputChange}
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            onClick={addCar}
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Добавить автомобиль
          </Button>
        </Box>
      )}

      {filteredCars.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Бренд</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Модель</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Мощность</TableCell>
              <TableCell>GPS</TableCell>
              <TableCell>Коробка передач</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Изображение</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.brand}</TableCell>
                <TableCell>{car.carName}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>
                  {editedCar === car ? (
                    <TextField
                      name="editedPrice"
                      label="Цена"
                      value={editedCarData.editedPrice}
                      onChange={(e) =>
                        setEditedCarData((prevData) => ({
                          ...prevData,
                          editedPrice: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    car.price + " BYN"
                  )}
                </TableCell>
                <TableCell>{car.power}</TableCell>
                <TableCell>{car.gps}</TableCell>
                <TableCell>{car.automatic}</TableCell>
                <TableCell>{car.description}</TableCell>

                <TableCell>
                  {editedCar === car ? (
                    <TextField
                      name="editedImgUrl"
                      label="Изображение"
                      value={editedCarData.editedImgUrl}
                      onChange={(e) =>
                        setEditedCarData((prevData) => ({
                          ...prevData,
                          editedImgUrl: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    car.imgUrl
                  )}
                </TableCell>
                <TableCell>
                  {editedCar === car ? (
                    <TextField
                      name="editedStatus"
                      select
                      label="Статус"
                      value={editedStatus}
                      onChange={handleStatusChange}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="В аренде">В аренде</option>
                      <option value="Свободная">Свободная</option>
                    </TextField>
                  ) : (
                    car.status
                  )}
                </TableCell>
                <TableCell>
                  {editedCar === car ? (
                    <Button
                      onClick={saveChanges}
                      variant="contained"
                      color="primary"
                    >
                      Сохранить
                    </Button>
                  ) : (
                    <Button onClick={() => handleEdit(car)} color="primary">
                      Редактировать
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Нет доступных автомобилей</p>
      )}
    </Box>
  );
};

export default AllCars;
