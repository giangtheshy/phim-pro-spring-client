import React from "react";
import {
	AiFillFacebook,
	AiFillInstagram,
	AiFillTwitterSquare,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
	const history = useHistory();
	return (
		<footer>
			<div className="footer-top">
				<ul>
					<li>Liên hệ với chúng tôi</li>
					<li>Thông tin doanh nghiệp</li>
					<li>Bản quyền</li>
				</ul>
				<ul>
					<li>Tài khoản</li>
					<li>Câu hỏi thường gặp</li>
					<li>Quyền riêng tư</li>
				</ul>
				<ul>
					<li onClick={() => history.push("/")}>Trang chủ</li>
					<li onClick={() => history.push("/seriesfilm")}>Phim bộ</li>
					<li onClick={() => history.push("/oddfilm")}>Phim lẻ</li>
				</ul>
				<ul>
					<li>Trung tâm trợ giúp</li>
					<li>Trung tâm đa phương tiện</li>
					<li>Điều khoản sử dụng</li>
				</ul>
				<ul>
					<li>
						<AiFillFacebook className="icon" /> Facebook
					</li>
					<li>
						<AiFillInstagram className="icon" /> Instagram
					</li>
					<li>
						<AiFillTwitterSquare className="icon" /> Twitter
					</li>
				</ul>
			</div>
			<div className="footer-bottom">
				<p>Liên Hệ : nhockrong98@gmail.com</p>
				<p>Số điện thoại: 0908290030</p>
			</div>
			<div className="footer-bottom"></div>
		</footer>
	);
};

export default Footer;
