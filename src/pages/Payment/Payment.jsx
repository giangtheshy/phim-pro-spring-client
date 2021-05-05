import React from "react";
import * as apis from "apis";
import "./Payment.scss";

const Payment = () => {
  const handleCheckout = async () => {
    const { data } = await apis.createPayment();
    if (data.code === "00") {
      window.location.href = data.data;
    }
  };
  return (
    <section className="payment">
      <div className="center">
        <img
          src="https://res.cloudinary.com/giangtheshy/image/upload/v1620120797/dev/khumuivietnam/vdox1iw5hxsfr7tqnlac.png"
          alt="logo"
        />
        <p className="title">Nâng cấp Premium</p>
        <p className="price">50.000VND</p>
        <p className="benefit">Quyền lợi tài khoản Premium</p>
        <ul>
          <li>Font chữ bình luận siêu cute.</li>
          <li>Khung bình luận và avatar.</li>
          <li>Hiệu ứng động khung bình luận.</li>
        </ul>
        <button className="checkout" onClick={handleCheckout}>
          <span className="child">Thanh toán ngay</span>
        </button>
      </div>
    </section>
  );
};

export default Payment;
