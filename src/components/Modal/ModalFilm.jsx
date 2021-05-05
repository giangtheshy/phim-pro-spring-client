import React from "react";
import "./ModalFilm.scss";
import { FaTimes } from "react-icons/fa";
const ModalFilm = ({ setModal, url }) => {
  return (
    <section className="modal-film-overlay">
      <button className="close-modal" onClick={() => setModal(false)}>
        <FaTimes /> Đóng
      </button>
      <iframe src={url} allowFullScreen className="film"></iframe>
    </section>
  );
};

export default ModalFilm;
