import React from "react";
import "../../styles/our-member.css";

import { Link } from "react-router-dom";
import ava01 from "../../assets/all-images/ava-1.jpg";
import ava02 from "../../assets/all-images/ava-2.jpg";

import ava04 from "../../assets/all-images/ava-4.jpg";

const OUR__MEMBERS = [
  {
    name: "Алексей Иванов",
    experience: "10 лет опыта",
    fbUrl: "https://www.facebook.com/login/",
    instUrl: "https://www.instagram.com/",
    twitUrl: "https://twitter.com/",

    imgUrl: ava01,
  },

  {
    name: "Марина Васильева",
    experience: "7 лет опыта",
    fbUrl: "https://www.facebook.com/login/",
    instUrl: "https://instagram.com/",
    twitUrl: "https://twitter.com/",

    imgUrl: ava02,
  },

  {
    name: "Дмитрий Петров",
    experience: "5 лет опыта ",
    fbUrl: "https://www.facebook.com/login/",
    instUrl: "https://www.instagram.com/",
    twitUrl: "https://twitter.com/",

    imgUrl: ava04,
  },
];

const OurMembers = () => {
  return (
    <>
      {OUR__MEMBERS.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="single__member">
            <div className="single__member-img">
              <img src={item.imgUrl} alt="" className="w-100" />

              <div className="single__member-social">
                <Link to={item.fbUrl}>
                  <i className="ri-facebook-line"></i>
                </Link>
                <Link to={item.twitUrl}>
                  <i className="ri-twitter-line"></i>
                </Link>

                <Link to={item.instUrl}>
                  <i className="ri-instagram-line"></i>
                </Link>
              </div>
            </div>

            <h6 className="text-center mb-0 mt-3">{item.name}</h6>
            <p className="section__description text-center">
              {item.experience}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OurMembers;
