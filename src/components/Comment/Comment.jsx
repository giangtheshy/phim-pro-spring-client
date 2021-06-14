import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Comment.scss";
import FormComment from "./FormComment/FormComment";
import Comments from "./Comments/Comments";
import useOnScreen from "components/utils/Hooks/useOnScreen";
import Loading from "components/utils/Loading/Loading";

const Comment = ({ id, comment_count }) => {
	const user = useSelector(state => state.users.username);
	const [showComment, setShowComment] = useState(false);
	const [loading, setLoading] = useState(false);
	const [ref, visible] = useOnScreen({ threshold: 0.4 });
	const handleComment = () => {
		if (comment_count !== 0) setShowComment(!showComment);
	};
	return (
		<section className="comment-section">
			{user ? (
				<FormComment id={id} />
			) : (
				<p
					style={{
						textAlign: "center",
						color: "#fff",
						marginBottom: "1rem",
						fontSize: "1.3rem",
					}}
				>
					Đăng nhập để đăng bình luận.
				</p>
			)}
			<button
				ref={ref}
				className={`btn-show-comment ${visible ? "show" : ""}`}
				onClick={handleComment}
			>
				<span className="child">
					{loading ? (
						<Loading />
					) : showComment ? (
						"Ẩn tất cả bình luận"
					) : comment_count === 0 ? (
						"Chưa có bình luận nào cho phim!"
					) : (
						`Hiển thị tất cả (${comment_count}) bình luận`
					)}
				</span>
			</button>
			{showComment && (
				<>
					{/* {user ? (
            <FormComment id={id} />
          ) : (
            <p style={{ textAlign: "center", color: "#fff" }}>Đăng nhập để đăng bình luận.</p>
          )} */}
					<Comments id={id} setLoading={setLoading} />
				</>
			)}
		</section>
	);
};

export default Comment;
