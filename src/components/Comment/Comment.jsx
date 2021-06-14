import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Comment.scss";
import FormComment from "./FormComment/FormComment";
import Comments from "./Comments/Comments";
import useOnScreen from "components/utils/Hooks/useOnScreen";
import Loading from "components/utils/Loading/Loading";

const Comment = ({ id, comment_count }) => {
  const user = useSelector((state) => state.users.username);
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ref, visible] = useOnScreen({ threshold: 0.4 });
  return (
    <section className="comment-section">
      <button
        ref={ref}
        className={`btn-show-comment ${visible ? "show" : ""}`}
        onClick={() => setShowComment(!showComment)}
      >
        <span className="child">
          {loading ? (
            <Loading />
          ) : showComment ? (
            "Ẩn tất cả bình luận"
          ) : comment_count === 0 ? (
            "Thêm bình luận mới"
          ) : (
            `Hiển thị tất cả (${comment_count}) bình luận`
          )}
        </span>
      </button>
      {showComment && (
        <>
          {user ? (
            <FormComment id={id} />
          ) : (
            <p style={{ textAlign: "center", color: "#fff" }}>Đăng nhập để đăng bình luận.</p>
          )}
          <Comments id={id} setLoading={setLoading} />
        </>
      )}
    </section>
  );
};

export default Comment;
