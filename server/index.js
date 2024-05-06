const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3307;
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "carrent",
  });

  app.post("/registration", (req, res) => {
    const { firstName, lastName, phone, email, password, role, deleteStatus } = req.body;

    db.query(
        "INSERT INTO users (firstName, lastName, email, phone, password, role, deleteStatus) VALUES (?, ?, ?, ?, ?, 'user', 'Активный')",
        [firstName, lastName, email, phone, password],
        (err, result) => {
            if (err) {
                console.error("Error while registering user:", err);
                return res.status(500).send("Internal server error");
            }
            // Проверяем, была ли операция вставки успешной
            if (result.affectedRows > 0) {
                // Если да, возвращаем данные зарегистрированного пользователя
                const user = {
                    user_id: result.insertId,
                    firstName,
                    role: 'user',
                    deleteStatus: 'Активный'
                };
                res.send(user);
            } else {
                // В случае неудачи возвращаем сообщение об ошибке
                res.status(500).send("Error while registering user");
            }
        }
    );
});


app.post("/login", (req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;
  db.query(
      "SELECT * FROM users WHERE phone = ? AND password = ? AND deleteStatus IS NOT NULL", // Добавлено условие на статус "Удален"
      [phone, password],
      (err, result) => {
          if (err) {
              res.send({err: err});
          }

          if(result.length > 0){
              const user = {
                  user_id: result[0].user_id,
                  firstName: result[0].firstName,
                  role: result[0].role,
                  deleteStatus: result[0].deleteStatus
              };
              res.send(user);
          } else {
              res.send({message: "Wrong phone/password "}); // Вернуть сообщение об ошибке, если пользователь не найден или удален
          }       
      }
  );
});

app.get("/cars", (req, res) => {
    db.query("SELECT * FROM cars", (err, result) => {
      if (err) {
        console.error("Error while fetching cars:", err);
        return res.status(500).send("Internal server error");
      }
  
      console.log("Cars data fetched successfully");
      return res.status(200).json(result);
    });
  });

  app.put("/updatecar/:id", (req, res) => {
    const carId = req.params.id;
    const { price, imgUrl,status } = req.body;
  
    db.query(
      "UPDATE cars SET price = ?, imgUrl = ?,status = ? WHERE car_id = ?",
      [price, imgUrl,status, carId],
      (err, result) => {
        if (err) {
          console.error("Error updating vehicle data:", err);
          return res.status(500).send("Internal server error");
        }
        console.log("Vehicle data has been successfully updated");
        return res.status(200).send("Vehicle data has been successfully updated");
      }
    );
  });
  app.post("/addCar", (req, res) => {
    const { brand, carName, model, price, power, gps, automatic, description, imgUrl } = req.body;
  
    db.query(
      "INSERT INTO cars (brand, carName, model, price, power, gps, automatic, description, imgUrl, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Временно не работает')",
      [brand, carName, model, price, power, gps, automatic, description, imgUrl],
      (err, result) => {
          if (err) {
              console.error("Error when adding a car:", err);
              return res.status(500).send("Error when adding a car:");
          }
  
          console.log("The car was added successfully");
          return res.status(200).send("The car was added successfully");
      }
    );
  });
 
  
  
  app.get("/profile", (req, res) => {
    const user_id = req.headers.authorization.split(' ')[1]; // Извлечение user_id из заголовка Authorization
    db.query("SELECT * FROM users WHERE user_id = ?", user_id, (err, result) => {
      if (err) {
        console.error("Error while fetching user data:", err);
        return res.status(500).send("Internal server error");
      }
  
      console.log("User data fetched successfully");
      return res.status(200).json(result[0]); // Возвращаем первую найденную запись
    });
  });

  app.get("/orders", (req, res) => {
    const user_id = req.headers.authorization.split(' ')[1];// Получаем user_id из авторизации
    db.query(
      "SELECT  cars.carName, rent.rentData, rent.selectedPayment, rent.status FROM rent INNER JOIN cars ON rent.car_id = cars.car_id WHERE rent.user_id = ?",
      [user_id],
      (err, result) => {
        if (err) {
          console.error("Error fetching user orders:", err);
          return res.status(500).send("Internal server error");
        }
  
        console.log("User orders fetched successfully");
        return res.status(200).json(result);
      }
    );
  });

  app.get("/ordersByDate", (req, res) => {
    const { selectedDate } = req.query; // Получаем выбранную дату из запроса
  
    // Выполняем запрос к базе данных для выборки заказов по указанной дате
    db.query(
      `SELECT rent.rent_id, users.firstName, users.phone, cars.carName, rent.rentData, rent.rentTime, rent.comments, rent.selectedPayment, rent.status 
      FROM rent 
      INNER JOIN cars ON rent.car_id = cars.car_id
      INNER JOIN users ON rent.user_id = users.user_id
      WHERE rentData = ?`,
      [selectedDate],
      (err, result) => {
        if (err) {
          console.error("Error fetching orders by date:", err);
          return res.status(500).send("Internal server error");
        }
        res.send(result); // Отправляем результат запроса клиенту
      }
    );
  });

  app.get("/questionsByDate", (req, res) => {
    const { selectedDate } = req.query; // Получаем выбранную дату из запроса
  
    // Выполняем запрос к базе данных для выборки вопросов пользователей по указанной дате
    db.query(
      `SELECT message_id,users.firstName, users.phone, messages.question, messages.messageData, messages.status
      FROM messages
      INNER JOIN users ON messages.user_id = users.user_id
      WHERE messageData = ?`,
      [selectedDate],
      (err, result) => {
        if (err) {
          console.error("Error when receiving questions by date:", err);
          return res.status(500).send("Internal server error");
        }
        res.send(result); // Отправляем результат запроса клиенту
      }
    );
  });
  
  app.get("/question", (req, res) => {
    const user_id = req.headers.authorization.split(' ')[1];// Получаем user_id из авторизации
    db.query(
      "SELECT  question, messageData, status FROM messages  WHERE user_id = ?",
      [user_id],
      (err, result) => {
        if (err) {
          console.error("Error fetching user orders:", err);
          return res.status(500).send("Internal server error");
        }
  
        console.log("User orders fetched successfully");
        return res.status(200).json(result);
      }
    );
  });

  app.put("/profile", (req, res) => {
    const user_id = req.headers.authorization.split(' ')[1]; // Извлечение user_id из заголовка Authorization
    const { firstName, lastName, email, phone, password } = req.body; // Получение обновленных данных из тела запроса
  
    db.query(
      "UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, password = ? WHERE user_id = ?",
      [firstName, lastName, email, phone,password, user_id,],
      (err, result) => {
        if (err) {
          console.error("Error while updating user profile:", err);
          return res.status(500).send("Internal server error");
        }
  
        console.log("User profile updated successfully");
        return res.status(200).send("User profile updated successfully");
      }
    );
  });
  
  app.get("/deletedUsers", (req, res) => {
    db.query(
      "SELECT * FROM users WHERE deleteStatus = 'Удален'",
      (err, result) => {
        if (err) {
          console.error("Error receiving deleted users:", err);
          return res.status(500).send("Internal server error");
        }
  
        console.log("Deleted users have been successfully received");
        return res.status(200).json(result);
      }
    );
  });

  app.put("/restoreUser", (req, res) => {
    const userId = req.query.id;
  
    db.query(
      "UPDATE users SET deleteStatus = 'Активный' WHERE user_id = ?",
      [userId],
      (err, result) => {
        if (err) {
          console.error("Error during user recovery:", err);
          return res.status(500).send("Internal server error");
        }
  
        console.log("The user has been successfully restored");
        return res.status(200).send("The user has been successfully restored");
      }
    );
  });

app.put("/deleteUser", (req, res) => {
  const user_id = req.query.id;

  db.query("UPDATE users SET deleteStatus = 'Удален' WHERE user_id = ?", [user_id], (err, result) => {
      if (err) {
          console.error("Error when marking a user as deleted:", err);
          return res.status(500).send("Internal server error");
      }
      console.log("The user has been successfully marked as deleted");
      return res.status(200).send("The user has been successfully marked as deleted");
  });
});

  app.get("/allorders", (req, res) => {
    db.query(
      `SELECT rent_id , users.firstName, users.phone, cars.carName, rent.rentData, rent.rentTime, rent.comments, rent.selectedPayment, rent.status
       FROM rent
       INNER JOIN cars ON rent.car_id = cars.car_id
       INNER JOIN users ON rent.user_id = users.user_id;`,
      (err, result) => {
        if (err) {
          console.error("Error while fetching all orders:", err);
          return res.status(500).send("Internal server error");
        }
  
        console.log("All orders fetched successfully");
        return res.status(200).json(result);
      }
    );
  });
  
  app.get("/allquestion", (req, res) => {
    db.query(
      `SELECT message_id, users.firstName, users.phone, messages.question,messages.messageData, messages.status
      FROM messages 
      INNER JOIN users ON  users.user_id = messages.user_id;`,
      (err, result) => {
        if (err) {
          console.error("Error while fetching all orders:", err);
          return res.status(500).send("Internal server error");
        }
  
        console.log("All orders fetched successfully");
        return res.status(200).json(result);
      }
    );
  });

  app.get("/ordersUser", (req, res) => {
    const userId = req.query.userId;
  
    db.query(
      `SELECT cars.carName, rent.rentData, rent.status 
       FROM rent 
       INNER JOIN cars ON rent.car_id = cars.car_id 
       WHERE rent.user_id = ?`,
      [userId],
      (err, result) => {
        if (err) {
          console.error("Error fetching user orders:", err);
          return res.status(500).send("Internal server error");
        }
  
        console.log("User orders fetched successfully");
        return res.status(200).json(result);
      }
    );
  });

  app.get("/questionUser", (req, res) => {
    const userId = req.query.userId;
  
    db.query(
      `SELECT messages.question, messages.status,messages.messageData
      FROM messages
      INNER JOIN users ON messages.user_id = users.user_id
      WHERE users.user_id = ?`,
      [userId,],
      (err, result) => {
        if (err) {
          console.error("Error fetching user orders:", err);
          return res.status(500).send("Internal server error");
        }
  
        console.log("User orders fetched successfully");
        return res.status(200).json(result);
      }
    );
  });

  app.put("/orders/:id/status", (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    db.query(
        "UPDATE rent SET status = ? WHERE rent_id = ?",
        [status, orderId],
        (err, result) => {
            if (err) {
                console.error("Error updating the order status:", err);
                return res.status(500).send("Internal server error");
            }

            console.log("The order status has been successfully updated");
            return res.status(200).send("The order status has been successfully updated");
        }
    );
});

app.put("/messages/:id/status", (req, res) => {
  const questionId = req.params.id;
  const { status } = req.body;

  db.query(
      "UPDATE messages SET status = ? WHERE message_id = ?",
      [status, questionId],
      (err, result) => {
          if (err) {
              console.error("Error updating the issue status:", err);
              return res.status(500).send("Internal server error");
          }

          console.log("The issue status has been successfully updated");
          return res.status(200).send("The issue status has been successfully updated");
      }
  );
});
  
app.post("/sendMessage", (req, res) => {
  const { user_id, question } = req.body;

  // Устанавливаем значение статуса по умолчанию
  const status = "Открыто";
  const currentDate = new Date(); // Получаем текущую дату и время
  const formattedDate = currentDate.toISOString().slice(0, 10); // Форматируем дату в формат YYYY-MM-DD

  db.query(
    "INSERT INTO messages (user_id, question, status, messageData) VALUES (?, ?, ?, ?)",
    [user_id, question, status, formattedDate],
    (err, result) => {
        if (err) {
            console.error("Error saving the question:", err);
            return res.status(500).send("Internal server error");
        }

        console.log("The user's question is saved");
        return res.status(200).send("The user's question is saved");
    }
);
});

app.post("/rentCar", (req, res) => {
    const {  user_id,car_id, rentData,rentTime, comments, selectedPayment  } = req.body; // Добавлено получение user_id из запроса
    const status = "Открыто";

    db.query(
        "INSERT INTO rent (user_id, car_id, rentData, rentTime, comments, selectedPayment, status) VALUES (?, ?, ?, ?, ?, ?, ?) ", // Добавлено user_id в запрос SQL
        [user_id,car_id, rentData,rentTime, comments, selectedPayment,status], // Добавлено передачу user_id в параметры запроса
        (err, result) => {
            if (err) {
                console.error("Error saving the rent:", err);
                return res.status(500).send("Internal server error");
            }

            console.log("The user's request has been accepted");
            return res.status(200).send("The user's request has been accepted");
        }
    );
});

app.get("/allusers", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error("Error while fetching all users:", err);
      return res.status(500).send("Internal server error");
    }

    console.log("All users fetched successfully");
    return res.status(200).json(result);
  });
});

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
    db.connect((err) => {
      if (err) throw err;
  
      console.log("Database connected!");
    });
  });
  