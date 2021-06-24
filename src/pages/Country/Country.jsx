import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ListFilm from "components/utils/ListFilm/ListFilm";

const Country = () => {
  const { country } = useParams();
  const films = useSelector((state) => state.films.films);
  return (
    <section className="country">
      <h3 className="odd-film__title">Phim nước {country}</h3>
      <ListFilm type="row" films={films?.filter((film) => film.country === country)} />
    </section>
  );
};

export default Country;
