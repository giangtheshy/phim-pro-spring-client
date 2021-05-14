import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosSend } from "react-icons/io";
import { createComment } from "actions/comment.action";
import "./FormComment.scss";

const FormComment = ({ id }) => {
  const user = useSelector((state) => state.users);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      dispatch(createComment({ film_id: id, message: value }, user.type));
      setValue("");
    } else {
      alert("Bình luận không thể trống");
    }
  };
  return (
    <div className="form-comment">
      <div className="info">
        <img
          src={
            user?.avatar ||
            "https://res.cloudinary.com/giangtheshy/image/upload/v1618042500/dev/khumuivietnam/pcwl6uqwzepykmhnpuks.jpg"
          }
          alt="avatar"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bình luận gì đó về bộ phim..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">
          <IoIosSend className="icon" />
        </button>
      </form>
    </div>
  );
};

export default FormComment;
