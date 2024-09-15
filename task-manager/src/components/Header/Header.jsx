import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "../../styles/Header.css";
// import logo from "../../logo512.png";
import logo from "../../logonew4.png";



const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>
      <div className="logout">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
