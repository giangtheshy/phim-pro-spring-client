import React, { useState } from "react";
import * as apis from "apis";
import Loading from 'components/utils/Loading/Loading';
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await apis.forgotPassword(email);
      setLoading(false);
      alert(data);
      setEmail("");
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="forgot-password">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email-forgot" className="text-input">
            <input
              type="text"
              name="email"
              id="email-forgot"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button className="btn-submit" type="submit">
            <span className="child">{ loading?<Loading/>:"Xác nhận"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
