import React, { useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";

import { updateComment, deleteComment } from "actions/comment.action";
import moment from "components/utils/moment";

const ItemCmt = ({ comment, index }) => {
  const user = useSelector((state) => state.users);
  const [isEdit, setIsEdit] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [value, setValue] = useState(comment.message);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleRemove = () => {
    dispatch(deleteComment(comment.id));
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (value) {
      dispatch(
        updateComment({
          id: comment.id,
          message: value,
          film_id: comment.film_id,
          created_date: comment.created_date,
          user_id: comment.user_id,
        })
      );
      setIsEdit(!isEdit);
    }
  };
  return (
    <article className={`comment-center ${comment.type === "premium" ? comment.type : ""} `}>
      {user?.username === comment?.username && (
        <button className="setting" title="Cài đặt" onClick={() => setOpenSetting(!openSetting)}>
          <BiDotsHorizontalRounded />
          {openSetting && (
            <div className="drop-down">
              <ul>
                <li onClick={handleEdit}>
                  <span className="child">{isEdit ? "Thoát" : "Chỉnh sửa"}</span>
                </li>
                <li onClick={handleRemove}>
                  <span className="child">Xóa</span>
                </li>
              </ul>
            </div>
          )}
        </button>
      )}
      <img src={comment?.avatar || user?.avatar} alt="avatar" />
      <div className="cmt-right">
        <div className="cmt-right__top">
          <p className="name">{comment?.username || user?.username}</p>
          <small className="timer">{moment(comment.created_date * 1000)}</small>
        </div>
        <div className="cmt-right__bot">
          {isEdit ? (
            <form onSubmit={handleUpdate}>
              <input className="message" type="text" defaultValue={value} onChange={(e) => setValue(e.target.value)} />
              <button type="submit">
                <GrUpdate className="icon" />
              </button>
            </form>
          ) : (
            <p className="message">{comment?.message}</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ItemCmt;
