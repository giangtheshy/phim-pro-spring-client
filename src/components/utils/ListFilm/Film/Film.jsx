import React, { useState, useEffect } from "react";
import "./Film.scss";
import { BsTagFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Stars from "components/utils/Stars/Stars";
import useOnScreen from "components/utils/Hooks/useOnScreen";
const Film = ({ film, index }) => {
  const history = useHistory();
  const user = useSelector((state) => state.users);
  const [ref, visible] = useOnScreen({ threshold: 0 });
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (visible) {
      setStatus(true);
    }
    return () => setStatus(true);
  }, [visible]);
  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index / 10}s` }}
      className={`film-center ${status ? "show" : ""}`}
      onClick={() => history.push(`/film/${film.id}`)}
    >
      <div className="img">
        <span className="evaluate">
          <AiFillHeart className="icon" />
          <span className="fav_count">{film.fav_count}</span>
        </span>
        <div className="img-center">
          <img src={film.image} alt={film.title} />
          {user?.watched?.some((item) => item * 1 === film.id) && (
            <span className="watched">
              <HiEye />
              Đã Xem
            </span>
          )}
        </div>
      </div>
      <div className="film-center__details">
        <Stars stars={film.stars * 1} />
        <h3 className="title">{film.title}</h3>
        <p>
          <BsTagFill className="icon-tag" />
          {film.category}
        </p>
      </div>
    </article>
  );
};

export default Film;
