import React, { useState } from "react";
import { useSelector } from "react-redux";
import MetaTags from "react-meta-tags";
import "./Home.scss";
import RightContent from "../../components/Home/RightContent/RightContent";
import LeftContent from "../../components/Home/LeftContent/LeftContent";
import Search from "../../components/Search/Search";

const Home = () => {
  const [value, setValue] = useState("");
  const films = useSelector((state) => state.films.films);
  return (
    <>
      <MetaTags>
        <title>Phim hay mới ra mắt | Xem những bộ phim hấp dẫn trên phim-pro</title>
        <meta
          name="og:description"
          content="Phim pro là trang web tuyển chọn những bộ phim hay và mới nhất với chất lượng tốt nhất đưa đến cho người xem . Click để chọn bộ phim yêu thích...."
        />
        <meta property="og:title" content="Phim hay mới ra mắt | Xem những bộ phim hấp dẫn trên phim-pro" />
        <meta property="og:image" content="https://i.ytimg.com/vi/v7JMxXntfXU/maxresdefault.jpg" />
      </MetaTags>
      <Search setValue={setValue} value={value} />
      <div className="home">
        <RightContent value={value} setValue={setValue} films={films} />
        <LeftContent films={films} />
      </div>
    </>
  );
};

export default Home;
