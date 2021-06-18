import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	AiFillDashboard,
	AiFillHeart,
	AiFillPlayCircle,
	AiFillStepBackward,
	AiFillStepForward,
	AiOutlineFullscreen,
} from "react-icons/ai";
import { BsFillVolumeUpFill, BsReply } from "react-icons/bs";
import { BiCast } from "react-icons/bi";
import { MdGroup } from "react-icons/md";

import * as apis from "apis";
import { getSingleFilm } from "actions/film.action";
import { addFavorite, removeFavorite } from "actions/user.action";
import Comment from "components/Comment/Comment";
import Episode from "components/Episode/Episode";
import useOnScreen from "components/utils/Hooks/useOnScreen";
import "./Watch.scss";
const Watch = () => {
	const { id, ep } = useParams();

	const dispatch = useDispatch();
	const [ref, visible] = useOnScreen({ threshold: 0.4 });
	const film = useSelector(state => state.films.film);
	const episodes = useSelector(state => state.films.episodes);
	const user = useSelector(state => state.users);
	const [url, setUrl] = useState("");

	useEffect(() => {
		dispatch(getSingleFilm(id));
		window.scrollTo({ top: 0, left: 0 });
		return () => dispatch(getSingleFilm());
	}, [id, ep, dispatch]);

	useEffect(() => {
		console.log("url w", url);
		// if (ep == 0 || ep == 1) {
		// 	setUrl(episodes[0].url);
		// } else {
		// 	setUrl(episodes[ep - 1].url);
		// }
		if (url === "") {
			let i = 0;
			let exist = true;
			while (exist) {
				if (episodes[i].number_ep == ep) {
					setUrl(episodes[i].url);
					exist = false;
				}
				i++;
			}
		}
	}, [ep]);

	const handleView = url => {
		setUrl(url);
	};
	const handleFav = () => {
		if (user?.favorites?.find(item => item * 1 === film.id)) {
			dispatch(removeFavorite(film.id));
		} else {
			dispatch(addFavorite(film.id));
		}
	};

	if (!film && !url) return <h1>Loading film and url</h1>;
	else if (!film)
		return (
			<>
				<div class="preloader">
					<div class="preloader__ring">
						<div class="preloader__sector">L</div>
						<div class="preloader__sector">o</div>
						<div class="preloader__sector">a</div>
						<div class="preloader__sector">d</div>
						<div class="preloader__sector">i</div>
						<div class="preloader__sector">n</div>
						<div class="preloader__sector">g</div>
						<div class="preloader__sector">.</div>
						<div class="preloader__sector">.</div>
						<div class="preloader__sector">.</div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
					</div>
					<div class="preloader__ring">
						<div class="preloader__sector">L</div>
						<div class="preloader__sector">o</div>
						<div class="preloader__sector">a</div>
						<div class="preloader__sector">d</div>
						<div class="preloader__sector">i</div>
						<div class="preloader__sector">n</div>
						<div class="preloader__sector">g</div>
						<div class="preloader__sector">.</div>
						<div class="preloader__sector">.</div>
						<div class="preloader__sector">.</div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
						<div class="preloader__sector"></div>
					</div>
				</div>
			</>
		);
	else if (!url) return <h1>Loading url!</h1>;
	return (
		<section className="play">
			<p className="title">{film?.title}</p>
			<p className="title">{ep != 0 ? `Tập ${ep}` : "Trailer"}</p>
			<div className="playF">
				<div className="ControlF">
					<iframe src={url} allowFullScreen className="film"></iframe>
					<div className="btnGroup">
						<div className="left">
							<button className="btn">
								<AiFillStepBackward />
							</button>
							<button className="btn">
								<AiFillPlayCircle />
							</button>
							<button className="btn">
								<AiFillStepForward />
							</button>
							<button className="btn">
								<BsFillVolumeUpFill />
							</button>
						</div>
						<div className="right">
							<button className="btn" onClick={handleFav}>
								{user?.favorites?.find(item => item * 1 === film.id) ? (
									<AiFillHeart style={{ color: "red" }} />
								) : (
									<AiFillHeart />
								)}
							</button>
							<button className="btn">
								<AiFillDashboard />
							</button>
							<button className="btn">
								<BsReply />
							</button>
							<button className="btn">
								<BiCast />
							</button>
							<button className="btn">
								<AiOutlineFullscreen />
							</button>
						</div>
					</div>
				</div>
				<div className="viewer">
					<MdGroup /> <span>1703</span>
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
