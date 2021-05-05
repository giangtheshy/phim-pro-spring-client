import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  const history = useHistory();
  return (
    <footer>
      <div className="footer-top">
        <ul>
          <li>Liên Hệ</li>
          <li>Giới Thiệu</li>
          <li>Bản Quyền</li>
        </ul>
        <ul>
          <li onClick={() => history.push("/")}>Trang Chủ</li>
          <li onClick={() => history.push("/seriesfilm")}>Phim Bộ</li>
          <li onClick={() => history.push("/oddfilm")}>Phim Lẻ</li>
        </ul>
        <ul>
          <li>
            <AiFillFacebook className="icon" /> Facebook
          </li>
          <li>
            <AiFillInstagram className="icon" /> Instagram
          </li>
          <li>
            <AiFillTwitterSquare className="icon" /> Twitter
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>Liên Hệ : nhockrong98@gmail.com</p>
      </div>
      <div className="footer-bottom"></div>
    </footer>
  );
};

export default Footer;
