import React, { useCallback } from "react";
import stringSimilarity from "string-similarity";
import "./LeftContent.scss";
import ListFilm from "../../utils/ListFilm/ListFilm";
import compare from "components/utils/similarString";
const LeftContent = ({ films }) => {
  const recommenderFilm = useCallback(() => {
    const title = localStorage.getItem("title");
    const category = localStorage.getItem("category");
    if (!title || !category) {
      return [];
    }
    const mapToArrayRecommendation = films.map((film) => {
      const ratingTitle = stringSimilarity.compareTwoStrings(film.title, title);
      const ratingCategory = stringSimilarity.compareTwoStrings(film.category, category);
      return { ...film, rating: ratingTitle + ratingCategory / 5 };
    });
    return mapToArrayRecommendation.sort((a, b) => b.rating - a.rating).slice(1, 6);
  }, [films?.length]);
  if (!films) return <></>;
  return (
    <section className="left-container">
      <div className="left-container__top">
        <h3 className="title-left">PHIM ĐỀ CỬ</h3>
        <ListFilm type="column" films={recommenderFilm()} />
      </div>
      <div className="left-container__bottom">
        <h3 className="title-left">PHIM HOT</h3>
        <ListFilm type="column" films={films.sort((a, b) => b.fav_count - a.fav_count).slice(0, 5)} />
      </div>
    </section>
  );
};

export default LeftContent;
