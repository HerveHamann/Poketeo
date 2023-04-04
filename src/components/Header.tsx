import React from "react";
import titlelogo from "../assets/img/titlelogo.webp";

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <div className="header-container">
        <img src={titlelogo} alt="poketeo" />
      </div>
    </div>
  );
};

export default Header;
