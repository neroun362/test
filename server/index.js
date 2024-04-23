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
    const { firstName, lastName, phone, email, password } = req.body;

    db.query(
        "INSERT INTO users (firstName, lastName, email, phone, password) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, email, phone, password],
        (err, result) => {
            if (err) {
                console.error("Error while registering user:", err);
                return res.status(500).send("Internal server error");
            }

            console.log("User registered successfully");
            return res.status(200).send("User registered successfully");
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
      "SELECT  cars.carName, rent.rentData, rent.selectedPayment FROM rent INNER JOIN cars ON rent.car_id = cars.car_id WHERE rent.user_id = ?",
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

  app.get("/allorders", (req, res) => {
    db.query(
      `SELECT users.firstName, cars.carName, rent.rentData, rent.rentTime, rent.selectedPayment
       FROM rent
       INNER JOIN cars ON rent.car_id = cars.car_id
       INNER JOIN users ON rent.user_id = users.user_id`,
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
      `SELECT users.firstName, users.phone, messages.question
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









  app.post("/sendMessage", (req, res) => {
    const {  user_id, question  } = req.body; // Добавлено получение user_id из запроса

    db.query(
        "INSERT INTO messages (user_id, question) VALUES (?, ?)", // Добавлено user_id в запрос SQL
        [user_id, question], // Добавлено передачу user_id в параметры запроса
        (err, result) => {
            if (err) {
                console.error("Ошибка при сохранении вопроса:", err);
                return res.status(500).send("Внутренняя ошибка сервера");
            }

            console.log("Вопрос пользователя сохранен");
            return res.status(200).send("Вопрос пользователя сохранен");
        }
    );
});
app.post("/rentCar", (req, res) => {
    const {  user_id,car_id, rentData,rentTime, comments, selectedPayment  } = req.body; // Добавлено получение user_id из запроса

    db.query(
        "INSERT INTO rent (user_id, car_id, rentData, rentTime, comments, selectedPayment) VALUES (?, ?, ?, ?, ?, ?) ", // Добавлено user_id в запрос SQL
        [user_id,car_id, rentData,rentTime, comments, selectedPayment], // Добавлено передачу user_id в параметры запроса
        (err, result) => {
            if (err) {
                console.error("Ошибка:", err);
                return res.status(500).send("Внутренняя ошибка сервера");
            }

            console.log("Заявка пользователя принята");
            return res.status(200).send("Заявка пользователя принята");
        }
    );
});









   





app.post("/login", (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    db.query(
        "SELECT * FROM users WHERE phone = ? AND password = ?",
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
                                       
                };
                res.send(user);
            } else {
                res.send({message: "Wrong phone/password"});
            }       
        }
    );
});











  
  
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
    db.connect((err) => {
      if (err) throw err;
  
      console.log("Database connected!");
    });
  });
  