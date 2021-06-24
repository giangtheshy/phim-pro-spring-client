import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { HiTrash } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Episodes.scss";

import * as apis from "apis";

const Episodes = ({ episode, handleView, id, ep }) => {
  const [showAddEp, setShowAddEp] = useState(false);
  const user = useSelector((state) => state.users);
  const [episodeData, setEpisodeData] = useState({
    url: "",
    number: "",
    id: "",
    film_id: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    setEpisodeData({ ...episodeData, [e.target.name]: e.target.value });
  };
  const handleAddEp = async (e) => {
    e.preventDefault();
    const regex = /youtube.com\/watch\?v=/g;
    const regexFullPhim = /ok.ru\/video/g;
    let url = "";
    if (episodeData.url.match(regex)) {
      url = episodeData.url.replace(regex, "youtube.com/embed/");
    } else if (episodeData.url.match(regexFullPhim)) {
      url = episodeData.url.replace(regexFullPhim, "ok.ru/videoembed");
    } else {
      url = episodeData.url;
    }
    if (Object.values(episodeData).every((item) => item !== "")) {
      await apis.updateEpisode({
        ...episodeData,
        url: url,
      });
      setShowAddEp(false);
    }
  };
  const handleRemoveEp = async () => {
    if (window.confirm("Bạn có chắc muốn xóa tập phim này không?")) {
      await apis.deleteEpisode(episode.id);
    }
  };
  const handleShowAddEp = () => {
    setEpisodeData(episode);
    setShowAddEp(!showAddEp);
  };
  const handleWatchEp = () => {
   
    handleView(episode.url);
    history.push(`/film/${id}/${episode.number_ep}`);

  };
  return (
    <>
      <article className={`btn-episode ${episode.number_ep == ep ? 'selected' : ''}`}>
        {user.role && (
          <>
            <button className="edit" onClick={handleShowAddEp}>
              <BiEdit />
            </button>
            <button className="remove" onClick={handleRemoveEp}>
              <HiTrash />
            </button>
          </>
        )}
        {showAddEp && (
          <div className="add-episode-modal">
            <form onSubmit={handleAddEp}>
              <label htmlFor="url" className="text-input">
                <input
                  type="text"
                  name="url"
                  id="url"
                  value={episodeData.url}
                  onChange={handleChange}
                  placeholder="Đường dẫn video(ví dụ: https://www.youtube.com/watch?v=DmjAF49cJX8)"
                />
              </label>
              <label htmlFor="number_ep" className="text-input">
                <input
                  type="number"
                  name="number_ep"
                  id="number_ep"
                  value={episodeData.number_ep}
                  onChange={handleChange}
                  placeholder="Số tập (ví dụ : 5)"
                />
              </label>
              <button type="submit" className="submit-btn">
                <span className="child">Cập nhật</span>
              </button>
            </form>
          </div>
        )}
        <span className="ep_number" onClick={handleWatchEp}>
          {episode.number_ep}
        </span>
      </article>
    </>
  );
};

export default Episodes;
