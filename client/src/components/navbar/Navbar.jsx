import React from "react";
import Logo from "../../assets/icon.svg";

import "../../styles/components/Navbar.scss";

function Navbar() {
  return (
    <div className="navbar-container">
      <img src={Logo} alt="App Logo" />
      <h1>Investment Calculator</h1>
    </div>
  );
}

export default Navbar;
