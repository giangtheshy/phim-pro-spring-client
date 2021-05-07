import React, { useCallback } from "react";
import stringSimilarity from "string-similarity";
import "./LeftContent.scss";
import ListFilm from "../../utils/ListFilm/ListFilm";
import compare from "components/utils/similarString";
const LeftContent = ({ films }) => {
  const recommenderFilm = useCallback(() => {
    const title = localStorage.getItem("title");
    if (!title) {
      return [];
    }
    const mapToArrayRecommendation = films.map((film) => {
      const ratingTitle = compare(film.title, title);
      // const ratingTitle = stringSimilarity.compareTwoStrings(film.title, title);
      return { ...film, rating: ratingTitle };
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
