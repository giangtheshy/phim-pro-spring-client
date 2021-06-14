import React from "react";
import "./ModalFilm.scss";
import { FaTimes } from "react-icons/fa";
import {
	AiFillDashboard,
	AiFillHeart,
	AiFillPlayCircle,
	AiFillStepBackward,
	AiFillStepForward,
	AiOutlineFullscreen,
} from "react-icons/ai";
import { BsFillVolumeUpFill, BsReply } from "react-icons/bs";
import { BiCast } from "react-icons/bi";
import { MdGroup } from "react-icons/md";
const ModalFilm = ({ setModal, url, title }) => {
	// return (
	//   <section className="modal-film-overlay">
	//     <button className="close-modal" onClick={() => setModal(false)}>
	//       <FaTimes /> Đóng
	//     </button>
	//     <iframe src={url} allowFullScreen className="film"></iframe>
	//   </section>
	// );
	return (
		<section className="modal-film-overlay">
			<div className="head">
				<span className="title">{title}</span>
				<button className="close-modal" onClick={() => setModal(false)}>
					<FaTimes />
				</button>
			</div>
			<div className="watch">
				<iframe src={url} allowFullScreen className="film"></iframe>
			</div>
			<div className="btnGroup">
				<div className="left">
					<button className="btn">
						<AiFillStepBackward />
					</button>
					<button className="btn">
						<AiFillPlayCircle />
					</button>
					<button className="btn">
						<AiFillStepForward />
					</button>
					<button className="btn">
						<BsFillVolumeUpFill />
					</button>
				</div>
				<div className="right">
					<button className="btn heart">
						<AiFillHeart />
					</button>
					<button className="btn">
						<AiFillDashboard />
					</button>
					<button className="btn">
						<BsReply />
					</button>
					<button className="btn">
						<BiCast />
					</button>
					<button className="btn">
						<AiOutlineFullscreen />
					</button>
				</div>
			</div>
			<div className="chatGroup">
				<button className="btn">
					<MdGroup /> <span>1500</span>
				</button>
				<div className="chatBox">
					<div className="chat">Cuộc trò chuyện</div>
					<div className="live">Trò chuyện trực tiếp</div>
				</div>
			</div>
		</section>
	);
};

export default ModalFilm;
