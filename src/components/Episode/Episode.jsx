import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEpisodes } from "actions/film.action";
import "./Episode.scss";
import Episodes from "./Episodes/Episodes";

import useOnScreen from "components/utils/Hooks/useOnScreen";
import Loading from "components/utils/Loading/Loading";
const Episode = ({ id, handleView, ep }) => {
  const episodes = useSelector((state) => state.films.episodes);
  const dispatch = useDispatch();
  const [ref, visible] = useOnScreen({ threshold: 0.3 });

  useEffect(() => {
    dispatch(getAllEpisodes(id));
    return () => dispatch(getAllEpisodes(undefined));
  }, [id, dispatch]);
  return (
    <section className="episode-section">
      <div ref={ref} className={`btn-container  ${visible ? "show" : ""}`}>
        {!episodes.length && <Loading />}
        {episodes.map((episode, index) => (
          <Episodes key={episode.id} episode={episode} handleView={handleView} index={index} id={id} ep={ep} />
        ))}
      </div>
    </section>
  );
};

export default Episode;
