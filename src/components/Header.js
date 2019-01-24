import "./style/Header.scss";
import React from "react";
import Title from "./Title";
import NavbarContainer from "../containers/NavbarContainer";

function Header() {
  return (
    <header className="Header">
      <Title />
      <NavbarContainer />
    </header>
  );
}

export default Header;
