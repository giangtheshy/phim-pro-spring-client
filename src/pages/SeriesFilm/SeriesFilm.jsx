import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./SeriesFilm.scss";
import ListFilm from "../../components/utils/ListFilm/ListFilm";
import Search from "../../components/Search/Search";
import convert from 'components/utils/convert';

const SeriesFilm = () => {
  const films = useSelector((state) => state.films.films);
  const [value, setValue] = useState("");
  if (films.length === 0) return <></>;

  return (
    <>
      <Search setValue={setValue} value={value} />
      <section className="series-film">
        <h3 className="series-film__title">Phim Bộ</h3>
        <ListFilm
          type="row"
          films={films
            .filter((film) => film.is_multi === true)
            .filter((film) => film.search.includes(convert(value)))}
        />
      </section>
    </>
  );
};

export default SeriesFilm;
