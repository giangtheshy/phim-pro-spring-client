import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { MdArrowDropDown } from "react-icons/md";
import "./Nav.scss";

const Nav = ({ showNav, setShowNav }) => {
  const history = useHistory();
  const location = useLocation().pathname;
  const user = useSelector((state) => state.users);
  const films = useSelector((state) => state.films.films);
  const [countryList, setCountryList] = useState([]);
  const [showDrop, setShowDrop] = useState(false);

  useEffect(() => {
    const handleEvent = (e) => {
      if (e.target.classList.contains("bold") || e.target.classList.contains("ul")) {
        setShowNav(false);
      }
    };
    window.addEventListener("click", handleEvent);
    return () => window.removeEventListener("click", handleEvent);
  }, []);
  useEffect(() => {
    if (films.length) {
      setCountryList([...new Set(films.map((item) => item.country.trim()))]);
    }
  }, [films]);

  return (
    <nav className={`nav ${showNav ? "show" : ""}`}>
      <ul className="ul">
        <li className={`bold ${location === "/oddfilm" ? "active" : ""}`} onClick={() => history.push("/oddfilm")}>
          Phim Lẻ
        </li>
        <li
          className={`bold ${location === "/seriesfilm" ? "active" : ""}`}
          onClick={() => history.push("/seriesfilm")}
        >
          Phim Bộ
        </li>
        <li className={`bold ${location.includes("/country") ? "active" : ""}`} onClick={() => setShowDrop(!showDrop)}>
          Quốc gia
          <MdArrowDropDown />
          {showDrop && (
            <div className="drop-down">
              {countryList?.map((item) => (
                <p className="item-drop" key={item} onClick={() => history.push(`/country/${item}`)}>
                  {item}
                </p>
              ))}
            </div>
          )}
        </li>
        {user.role && (
          <li className={`bold ${location === "/manager" ? "active" : ""}`} onClick={() => history.push("/manager")}>
            Quản Lý Phim
          </li>
        )}
        <li className={`bold ${location === "/account" ? "active" : ""}`} onClick={() => history.push("/account")}>
          {user.username ? (
            <div className="account bold">
              <img
                src={
                  user.avatar ||
                  "https://res.cloudinary.com/giangtheshy/image/upload/v1618042500/dev/khumuivietnam/pcwl6uqwzepykmhnpuks.jpg"
                }
                alt="avatar"
                className="avatar bold"
              />
              <p className="bold">{user.username}</p>
            </div>
          ) : (
            "Tài Khoản"
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
