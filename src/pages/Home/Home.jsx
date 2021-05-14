import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import RightContent from "../../components/Home/RightContent/RightContent";
import LeftContent from "../../components/Home/LeftContent/LeftContent";
import Search from "../../components/Search/Search";

const Home = () => {
  const [value, setValue] = useState("");
  const films = useSelector((state) => state.films.films);
  return (
    <>
      <Search setValue={setValue} value={value} />
      <div className="home">
        <RightContent value={value} setValue={setValue} films={films} />
        <LeftContent films={films} />
      </div>
    </>
  );
};

export default Home;
