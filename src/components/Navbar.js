import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ woeid }) {
  return (
    <nav className="Navbar">
      <ul className="Navbar__navbar">
        <li className="navbar__item">
          <NavLink to="/" className="navbar__link">
            Главная
          </NavLink>
        </li>
        {woeid ? (
          <li className="navbar__item">
            <NavLink to={`/${woeid}/`} className="navbar__link">
              Детально
            </NavLink>
          </li>
        ) : null}
        <li className="navbar__item">
          <NavLink to="/map/" className="navbar__link">
            Карта
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
