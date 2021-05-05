import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Nav.scss";

const Nav = ({ showNav, setShowNav }) => {
  const history = useHistory();
  const location = useLocation().pathname;
  const user = useSelector((state) => state.users);

  useEffect(() => {
    const handleEvent = (e) => {
      if (e.target.classList.contains("bold") || e.target.classList.contains("ul")) {
        setShowNav(false);
      }
    };
    window.addEventListener("click", handleEvent);
    return () => window.removeEventListener("click", handleEvent);
  }, []);
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
