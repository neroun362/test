// import all images from assets/images directory
import img01 from "../all-images/cars-img/tesla-vector.png";
import img02 from "../all-images/cars-img/mercedes.png";
import img03 from "../all-images/cars-img/BMW.png";
import img04 from "../all-images/cars-img/audi.jpg";
import img05 from "../all-images/cars-img/cadilac.jpg";
import img06 from "../all-images/cars-img/Lexus.jpg";
import img07 from "../all-images/cars-img/Chevrolet Camaro.jpg";
import img08 from "../all-images/cars-img/dodge.png";
import img09 from "../all-images/cars-img/porshe.png";

const carData = [
  {
    id: 1,
    brand: "Tesla",
    carName: "Tesla Model S",
    imgUrl: img01,
    model: "2022 год",
    price: 360,
    speed: "518 л.с", // поменять на мощность
    gps: "GPS",
    automatic: "Автомат",
    description:
      " Погрузитесь в мир инновационной технологии и безупречного дизайна с Tesla Model S. Этот электрический седан представляет собой воплощение роскоши, производительности и экологической ответственности в автомобильном мире.",
  },

  {
    id: 2,
    brand: "Mercedes Benz",
    carName: "Mercedes Benz S Class",
    imgUrl: img02,
    model: "2019 год",
    price: 450,
    speed: "490 л.с", // поменять на мощность
    gps: "GPS",
    automatic: "Автомат",
    description:
      " Добро пожаловать в мир непревзойденной элегантности и технического совершенства с Mercedes-Benz S-Class. Этот автомобиль не просто представляет собой символ роскоши, он задает новые стандарты комфорта, безопасности и инноваций в автомобильной индустрии.",
  },

  {
    id: 3,
    brand: "BMW",
    carName: "BMW X5",
    imgUrl: img03,
    model: "2020 год",
    price: 380,
    speed: "521 л.с.",
    gps: "GPS",
    automatic: "Автомат",
    description:
      " BMW X5 M50i – это совершенно новый уровень производительности и роскоши в мире внедорожников. Этот автомобиль предлагает вам выдающиеся спортивные характеристики в сочетании с роскошным комфортом и передовыми технологиями, делая каждую поездку незабываемой.",
  },

  {
    id: 4,
    brand: "Audi",
    carName: "Audi RS7",
    imgUrl: img04,
    model: "2021 год",
    price: 460,
    speed: "600 л.с.",
    gps: "GPS Navigation",
    automatic: "Автомат",
    description:
      " Добро пожаловать в мир Audi RS7 – автомобиля, который сочетает в себе высочайший уровень производительности с элегантным дизайном и передовыми технологиями. Этот спортивный седан предлагает вам непревзойденный опыт вождения и оставляет незабываемые впечатления на каждой дороге.",
  },

  {
    id: 5,
    brand: "Cadillac",
    carName: "Cadillac Escalade",
    imgUrl: img05,
    model: "2018 год",
    price: 400,
    speed: "420 л.с.",
    gps: "GPS",
    automatic: "Автомат",
    description:
      " Добро пожаловать в мир Cadillac Escalade — автомобиля, который воплощает в себе роскошь, стиль и мощь. Этот внедорожник выдающегося качества предлагает непревзойденный комфорт и производительность, делая каждую поездку незабываемой.",
  },

  {
    id: 6,
    brand: "Lexus",
    carName: "Lexus LX 450d",
    imgUrl: img06,
    model: "2018 год",
    price: 370,
    speed: "282 л.с.",
    gps: "GPS",
    automatic: "Автомат",
    description:
      " Добро пожаловать в мир Lexus LX 450d - автомобиля, который сочетает в себе внушительную роскошь, передовые технологии и выдающиеся внедорожные возможности. Этот внедорожник предлагает вам элегантность и мощь, обеспечивая исключительный комфорт в любых условиях.",
  },

  {
    id: 7,
    brand: "Chevrolet",
    carName: "Chevrolet Camaro",
    imgUrl: img07,
    model: "2022 год",
    price: 500,
    speed: "355 л.с.",
    gps: "GPS ",
    automatic: "Автомат",
    description:
      " Добро пожаловать в мир Chevrolet Camaro — символа американской автомобильной культуры, который сочетает в себе элегантность, мощь и азартные возможности вождения. Camaro предлагает вам неповторимый опыт, который оставляет за рулем яркие впечатления.",
  },

  {
    id: 8,
    brand: "Ford",
    carName: "Ford Mustang",
    imgUrl: img08,
    model: "2019 год",
    price: 350,
    speed: "310 л.с.",
    gps: "GPS",
    automatic: "Автомат",
    description:
      "Добро пожаловать в мир Ford Mustang — символа свободы, мощи и стиля. Этот автомобиль исторически является воплощением американской мечты о скорости и свободе, предлагая неповторимый опыт вождения и безграничные возможности на дороге.",
  },
  {
    id: 9,
    brand: "Porsche",
    carName: "Porsche boxster",
    imgUrl: img09,
    model: "2017 год",
    price: 260,
    speed: "275 л.с.",
    gps: "GPS",
    automatic: "Автомат",
    description:
      "Добро пожаловать в мир Porsche Boxster 718 — иконы автомобильного мастерства, предлагающей неповторимый опыт вождения и элегантный стиль. Этот спортивный родстер объединяет в себе великолепную производительность, динамичный дизайн и передовые технологии, чтобы подарить вам незабываемые моменты за рулем.",
  },
];

export default carData;
