import React, { useState, useEffect } from "react";
import "./Manager.scss";
import { useSelector, useDispatch } from "react-redux";
import { createFilm, updateFilm, setIsEdit } from "actions/film.action";
import convert from "components/utils/convert";

const Manager = () => {
  const dispatch = useDispatch();
  const film = useSelector((state) => state.films.film);
  const role = useSelector((state) => state.users.role);
  const isEdit = useSelector((state) => state.films.isEdit);

  const [filmData, setFilmData] = useState({
    title: "",
    image: "",
    stars: "",
    category: "",
    episode: "",
    directors: "",
    country: "",
    description: "",
    up_coming: "",
    is_multi: "",
  });
  useEffect(() => {
    if (isEdit) {
      setFilmData(film);
    }
  }, []);
  const handleChange = (e) => {
    setFilmData({ ...filmData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(filmData).every((item) => item !== "")) {
      const regex = /youtube.com\/watch\?v=/g;
      if (isEdit) {
        dispatch(
          updateFilm({
            ...filmData,
            search: convert(filmData.title),
            // url: filmData.url.match(regex) ? filmData.url.replace(regex, "youtube.com/embed/") : filmData.url,
          }),
        );
      } else {
        dispatch(
          createFilm({
            ...filmData,
            search: convert(filmData.title),
            // url: filmData.url.match(regex) ? filmData.url.replace(regex, "youtube.com/embed/") : filmData.url,
          }),
        );
      }

      setFilmData({
        title: "",
        image: "",
        stars: "",
        category: "",
        episode: "",
        directors: "",
        country: "",
        description: "",
        up_coming: "false",
        evaluate: 10,
        is_multi: "false",
      });
      dispatch(setIsEdit(null));
      window.scrollTo({ top: 0, left: 0 });
    } else {
      alert("Phải điền đầy đủ các trường !");
    }
  };
  if (!role) return <h1>Page not found</h1>;
  return (
    <section className="manager">
      <div className="form-input">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-input">
            <span className="label">Tên phim : </span>
            <input
              type="text"
              name="title"
              id="title"
              value={filmData.title}
              onChange={handleChange}
              placeholder="Tên Phim (ví dụ : Gái Già Lắm Chiêu)"
            />
          </label>
          <label htmlFor="image" className="text-input">
            <span className="label">Ảnh bìa : </span>
            <input
              type="text"
              name="image"
              id="image"
              value={filmData.image}
              onChange={handleChange}
              placeholder="Đường dẫn ảnh đại diện phim  (ví dụ : https://image-phim-hay.jpg)"
            />
          </label>
          <label htmlFor="stars" className="text-input">
            <span className="label">Số sao : </span>
            <input
              type="number"
              name="stars"
              id="stars"
              value={filmData.stars}
              onChange={handleChange}
              placeholder="Số sao của phim (ví dụ: 4)"
              min="1"
              max="5"
            />
          </label>
          <label htmlFor="category" className="text-input">
            <span className="label">Thể loại : </span>
            <input
              type="text"
              name="category"
              id="category"
              value={filmData.category}
              onChange={handleChange}
              placeholder="Thể loại phim (ví dụ: Phim ngôn tình)"
            />
          </label>
          <label htmlFor="episode" className="text-input">
            <span className="label">Số tập : </span>
            <input
              type="number"
              name="episode"
              id="episode"
              value={filmData.episode}
              onChange={handleChange}
              placeholder="Số tập phim (ví dụ : 3)"
              min="1"
            />
          </label>
          <label htmlFor="directors" className="text-input">
            <span className="label">Đạo diễn : </span>
            <input
              type="text"
              name="directors"
              id="directors"
              value={filmData.directors}
              onChange={handleChange}
              placeholder="Đạo diễn (ví dụ: Fujitora)"
            />
          </label>
          <label htmlFor="country" className="text-input">
            <span className="label">Nước sản xuất : </span>
            <input
              type="text"
              name="country"
              id="country"
              value={filmData.country}
              onChange={handleChange}
              placeholder="Nước sản xuất (ví dụ : Việt Nam)"
            />
          </label>
          <label htmlFor="description" className="text-input">
            <span className="label">Mô tả : </span>
            <textarea
              type="text"
              name="description"
              id="description"
              value={filmData.description}
              onChange={handleChange}
              placeholder="Mô tả phim (ví dụ : Cua Lại Vợ Bầu là một phim lẻ thuộc thể loại Hài hước nhưng không kém phần cảm xúc , nhiều lúc làm người xem phải khóc theo. Phim được thực hiện bởi đạo diễn Nhất Trung. Một đạo diễn rất nổi tiếng mà chắc hẳn fan của Phim Việt Nam chắc ai cũng biết. Phim với sự tham gia của dàn diễn viên nổi tiếng Showbiz Việt như Trấn Thành...)"
              rows="10"
            />
          </label>
          <div className="radio-group">
            <label className="radio-input">
              <input
                type="radio"
                name="up_coming"
                checked={filmData.up_coming.toString() === "false"}
                value={false}
                onChange={handleChange}
              />{" "}
              Đã ra mắt
            </label>
            <label className="radio-input">
              <input
                type="radio"
                name="up_coming"
                checked={filmData.up_coming.toString() === "true"}
                value={true}
                onChange={handleChange}
              />{" "}
              Chưa ra mắt
            </label>
          </div>
          <div className="radio-group">
            <label className="radio-input">
              <input
                type="radio"
                name="is_multi"
                checked={filmData.is_multi.toString() === "false"}
                value={false}
                onChange={handleChange}
              />{" "}
              Phim Lẻ
            </label>
            <label className="radio-input">
              <input
                type="radio"
                name="is_multi"
                checked={filmData.is_multi.toString() === "true"}
                value={true}
                onChange={handleChange}
              />{" "}
              Phim Bộ
            </label>
          </div>
          {/* {filmData.is_multi === "false" && (
            <label htmlFor="url" className="text-input">
              <input
                type="text"
                name="url"
                id="url"
                value={filmData.url}
                onChange={handleChange}
                placeholder="Đường dẫn video phim (ví dụ : https://video-phim-hay.mp4)"
              />
            </label>
          )} */}
          <button type="submit" className="submit-btn">
            {isEdit ? "Cập Nhật Phim" : "Thêm Phim"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Manager;
