import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEpisodes } from "actions/film.action";
import "./Episode.scss";
import Episodes from "./Episodes/Episodes";

import useOnScreen from "components/utils/Hooks/useOnScreen";

const Episode = ({ id, handleView, ep }) => {
	const episodes = useSelector(state => state.films.episodes);
	const dispatch = useDispatch();
	const [ref, visible] = useOnScreen({ threshold: 0.3 });

	useEffect(() => {
		dispatch(getAllEpisodes(id));
	}, [id, dispatch]);
	return (
		<section className="episode-section">
			{/* <button className="select-episode">
        <span className="child">Chọn tập phim</span>
      </button> */}
			<div ref={ref} className={`btn-container  ${visible ? "show" : ""}`}>
				{episodes.map((episode, index) => (
					<Episodes
						key={episode.id}
						episode={episode}
						handleView={handleView}
						index={index}
						id={id}
						ep={ep}
					/>
				))}
			</div>
		</section>
	);
};

export default Episode;
