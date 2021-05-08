import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllComments, clearComments } from "actions/comment.action";
import ItemCmt from "./ItemCmt";
import "./Comments.scss";

const Comments = ({ id, setLoading }) => {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getAllComments(id, setLoading));
    }
    return () => dispatch(clearComments());
  }, [id]);
  return (
    <div className="comments">
      {comments.map((comment, index) => (
        <ItemCmt comment={comment} key={comment.id} index={index} />
      ))}
    </div>
  );
};

export default Comments;
