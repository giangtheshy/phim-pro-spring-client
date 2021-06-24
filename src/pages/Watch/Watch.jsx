import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getSingleFilm } from "actions/film.action";
import { addWatched } from "actions/user.action";
import Comment from "components/Comment/Comment";
import Episode from "components/Episode/Episode";
import "./Watch.scss";
import Loading from "components/utils/Loading/Loading";
const Watch = () => {
  const { id, ep } = useParams();

  const dispatch = useDispatch();
  const film = useSelector((state) => state.films.film);
  const episodes = useSelector((state) => state.films.episodes);
  const user = useSelector((state) => state.users);
  const [url, setUrl] = useState("");

  useEffect(() => {
    dispatch(getSingleFilm(id));
    return () => dispatch(getSingleFilm());
  }, [id, dispatch]);
  useEffect(() => {
    localStorage.setItem("title", film?.title);
  }, [film, ep, user]);
  useEffect(() => {
    setUrl(episodes?.find((epi) => epi.number_ep === ep * 1)?.url);
  }, [ep, episodes, dispatch]);
  const handleView = useCallback(
    (url) => {
      if (!user?.watched.find((item) => item == id)) {
        dispatch(addWatched(id));
      }
      setUrl(url);
    },
    [user],
  );

  if (!localStorage.getItem("isLoggedIn"))
    return <h1 style={{ textAlign: "center", color: "#fff" }}>Phải đăng nhập để có thể xem phim nha :v </h1>;
  if (!film)
    return (
      <h1 style={{ textAlign: "center", color: "#fff" }}>
        <Loading />
      </h1>
    );

  return (
    <section className="play">
      <p className="title">{film?.title}</p>
      <p className="title">{ep != 0 ? `Tập ${ep}` : "Trailer"}</p>
      <div className="playF">
        <div className="ControlF">
          <iframe src={url} allowFullScreen className="film"></iframe>
        </div>
        <div className="episode">
          <Episode id={id} handleView={handleView} ep={ep} />
        </div>
      </div>
      <Comment id={id} comment_count={film.comment_count} />
    </section>
  );
};

export default Watch;
