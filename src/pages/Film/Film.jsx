import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsTagFill } from "react-icons/bs";
import { HiHeart, HiEye } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";

import * as apis from "apis";
import { getSingleFilm, setIsEdit, removeFilm } from "actions/film.action";
import { addFavorite, addWatched, removeFavorite } from "actions/user.action";
import "./Film.scss";
import Stars from "components/utils/Stars/Stars";
import ListFilm from "components/utils/ListFilm/ListFilm";
import ModalFilm from "components/Modal/ModalFilm";
import Comment from "components/Comment/Comment";
import Episode from "components/Episode/Episode";
import useOnScreen from "components/utils/Hooks/useOnScreen";

const Film = () => {
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState("");
  const [showAddEp, setShowAddEp] = useState(false);
  const [episode, setEpisode] = useState({ number_ep: "", url: "" });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const film = useSelector((state) => state.films.film);
  const episodes = useSelector((state) => state.films.episodes);
  const films = useSelector((state) => state.films.films);
  const { id } = useParams();
  const history = useHistory();
  const [ref, visible] = useOnScreen({ threshold: 0.4 });
  useEffect(() => {
    dispatch(getSingleFilm(id));
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);

  const handleFav = () => {
    if (user?.favorites?.find((item) => item * 1 === film.id)) {
      dispatch(removeFavorite(film.id));
    } else {
      dispatch(addFavorite(film.id));
    }
  };
  const handleWatch = () => {
    if (!user?.watched?.find((item) => item * 1 === film.id) && user.username) {
      localStorage.setItem("title", film.title);
      handleView(episodes[0].url);
      dispatch(addWatched(film.id));
    } else if (!user.username) {
      history.push("/account");
      alert("Phải Đăng Nhập Để Xem !");
    } else if (user.username) {
      localStorage.setItem("title", film.title);
      handleView(episodes[0].url);
    }
  };
  const handleEdit = () => {
    dispatch(setIsEdit(id));
    history.push("/manager");
  };
  const handleRemove = () => {
    const verify = window.confirm("Are you sure you want to delete?");
    if (verify) {
      dispatch(removeFilm(id));
      history.push("/");
    }
  };
  const handleView = (url) => {
    setUrl(url);
    setModal(true);
  };
  const handleShowAdd = () => {
    setShowAddEp(!showAddEp);
  };
  const handleChange = (e) => {
    setEpisode({ ...episode, [e.target.name]: e.target.value });
  };
  const handleAddEp = async (e) => {
    e.preventDefault();
    const regex = /youtube.com\/watch\?v=/g;
    const regexFullPhim = /ok.ru\/video/g;
    let url = "";
    if (episode.url.match(regex)) {
      url = episode.url.replace(regex, "youtube.com/embed/");
    } else if (episode.url.match(regexFullPhim)) {
      url = episode.url.replace(regexFullPhim, "ok.ru/videoembed");
    } else {
      url = episode.url;
    }
    await apis.createEpisode({
      ...episode,
      film_id: id,
      url: url,
    });
    setEpisode({ number_ep: 0, url: "" });
  };
  if (!film) return <></>;
  return (
    <section className="film">
      {modal && <ModalFilm setModal={setModal} url={url || film.url} />}
      <div className="film__introduce">
        <div className="film__introduce-left">
          <img src={film.image} alt={film.title} />
        </div>
        <div className="film__introduce-right">
          <h3 className="title">{film.title}</h3>
          <div className="evaluate">
            <Stars stars={film.stars * 1} />
            <p>
              <BsTagFill className="icon-tag" />
              {film.category}
            </p>
          </div>
          <div className="btn-group">
            <button
              className={`add-fav ${user?.favorites?.find((item) => item * 1 === film.id) ? "disable" : ""}`}
              onClick={handleFav}
            >
              <span className="child">
                {" "}
                <HiHeart /> {user?.favorites?.find((item) => item * 1 === film.id) ? "Hủy Thích" : "Yêu Thích"}
              </span>
            </button>

            <button className="watch" onClick={handleWatch}>
              <span className="child">
                {" "}
                <HiEye /> {film.up_coming === false ? "Xem Phim" : "Trailer"}
              </span>
            </button>

            {user.role && (
              <>
                <button className="watch" onClick={handleEdit}>
                  <span className="child">
                    <BiEdit /> Cập Nhật
                  </span>
                </button>
                <div className="episode">
                  <span onClick={handleShowAdd} className="child">
                    <AiOutlinePlusCircle /> {showAddEp ? "Thoát" : "Thêm Tập"}
                  </span>
                  {showAddEp && (
                    <div className="add-episode-modal">
                      <form onSubmit={handleAddEp}>
                        <label htmlFor="url" className="text-input">
                          <input
                            type="text"
                            name="url"
                            id="url"
                            value={episode.url}
                            onChange={handleChange}
                            placeholder="Đường dẫn video(ví dụ: https://www.youtube.com/watch?v=DmjAF49cJX8)"
                          />
                        </label>
                        <label htmlFor="number_ep" className="text-input">
                          <input
                            type="number"
                            name="number_ep"
                            id="number_ep"
                            value={episode.number_ep}
                            onChange={handleChange}
                            placeholder="Số tập (ví dụ : 5)"
                          />
                        </label>
                        <button type="submit" className="submit-btn">
                          <span className="child">Thêm tập phim</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
                <button className="add-fav" onClick={handleRemove}>
                  <span className="child">
                    {" "}
                    <FaTrash /> Xóa Phim
                  </span>
                </button>
              </>
            )}
          </div>
          <div className="details-option">
            <p>
              <span className="bold">Trạng thái:</span>
              <span className="orange-text"> {film.upComing === "true" ? "Chưa ra mắt" : "Hoàn tất"}</span>
            </p>
            <p>
              <span className="bold">Đạo diễn:</span> <span className="orange-text">{film.directors},</span>
            </p>
            <p>
              <span className="bold">Quốc gia:</span> <span className="orange-text">{film.country},</span>
            </p>
            <p>
              <span className="bold">Lượng yêu thích:</span> <span className="orange-text">{film.fav_count} người</span>
            </p>
            <p>
              <span className="bold">Thời lượng:</span>{" "}
              <span className="orange-text">{film.is_multi === "true" ? "45" : "90"} phút/tập</span>
            </p>
            <p>
              <span className="bold">Số tập:</span> <span className="orange-text">{film.episode} tập</span>
            </p>
            <p>
              <span className="bold">Chất lượng:</span> <span className="orange-text">Nhúng</span>
            </p>
            <p>
              <span className="bold">Số bình luận:</span>{" "}
              <span className="orange-text">{film.comment_count} bình luận</span>
            </p>
            <p>
              <span className="bold">Ngôn ngữ:</span> <span className="orange-text">Phụ đề Việt</span>
            </p>
            <p>
              <span className="bold">Thể loại:</span> <span className="orange-text">{film.category}</span>
            </p>
          </div>
        </div>
      </div>
      <Episode id={id} handleView={handleView} />
      <div ref={ref} className={`film__detail ${visible ? "show" : ""}`}>
        {film.description}
      </div>
      <Comment id={id} comment_count={film.comment_count} />
      <ListFilm type="row" films={films.filter((item) => item.is_multi === film.is_multi && item.id !== film.id)} />
    </section>
  );
};

export default Film;
