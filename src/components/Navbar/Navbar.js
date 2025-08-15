import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useBuild } from "../../context/BuildContext";

export const Navbar = () => {
  const { build } = useBuild();
  const itemCount = Object.keys(build).length;

  return (
    <div className="navbar-container">
      <ul className="appbar">
        <Link to="/home" className="logo-link">
          <li className="navbar-logo">
            monte crypto
          </li>
        </Link>

        <div className="nav-links">
          <Link to="/productos" className="nav-link">
            <li>Productos</li>
          </Link>
          <Link to="/armado" className="nav-link cart-link">
            <li>
              <span>Mi Armado</span>
              {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
              )}
            </li>
          </Link>
        </div>
      </ul>
    </div>
  );
};
