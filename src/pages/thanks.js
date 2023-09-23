import React from "react";
import { Link } from "react-router-dom";
import "./thanks.css";

const Thankyou = () => {
  return (
    <div className="thankYouPage">
      <div className="orderContent">
        <p className="orderMessage">Your Order Will Be Delivered Shortly</p>
      </div>
      <img
        src="https://res.cloudinary.com/dipkglaib/image/upload/v1691587509/WhatsApp_Image_2023-08-09_at_18.39.03-removebg-preview_dcdijo.png"
        alt="deliveryImage"
        className="deliveryImage"
      />
      <div className="orderContent2">
        <p className="thankYouMessage">Thanks For Shopping With Us</p>
        <div className="orderButton">
          <Link to="/shop" className="shopLink">
            Shop
          </Link>
          <Link to="/" className="homeLink">
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
