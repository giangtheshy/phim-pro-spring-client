import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GiPopcorn } from "react-icons/gi";
import { FaBars } from "react-icons/fa";

import "./Header.scss";
import Nav from "./Nav/Nav";

const Header = () => {
  const history = useHistory();
  const [showNav, setShowNav] = useState(false);
  return (
    <header>
      <div className="logo" onClick={() => history.push("/")}>
        <GiPopcorn className="icon-logo" />
        <span className="bold orange-text">PHIM</span>PRO
      </div>
      <FaBars className="icon" onClick={() => setShowNav(true)} />
      <Nav showNav={showNav} setShowNav={setShowNav} />
    </header>
  );
};

export default Header;
