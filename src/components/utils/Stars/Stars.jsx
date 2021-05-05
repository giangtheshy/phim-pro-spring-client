import React from "react";
import { HiStar } from "react-icons/hi";
import "./Stars.scss";

const Stars = ({ stars }) => {
  let result = [];
  const renderStars = () => {
    for (let i = 1; i <= 5; i++) {
      if (i <= stars) {
        result.push("active");
      } else {
        result.push("");
      }
    }
  };
  renderStars();
  return (
    <div className="stars">
      {result.map((item, index) => (
        <HiStar className={`star ${item}`} key={index} />
      ))}
    </div>
  );
};

export default Stars;
