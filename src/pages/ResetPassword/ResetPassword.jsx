import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "apis";
import Loading from "components/utils/Loading/Loading";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Password không khớp");
      return;
    }
    try {
      setLoading(true);
      const res = await apis.resetPassword(data, token);
      setLoading(false);
      alert(res.data);
      setData({ password: "", confirmPassword: "" });
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="reset-password">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="text-input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter new password "
              value={data.password}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="confirmPassword" className="text-input">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              value={data.confirmPassword}
              onChange={handleChange}
            />
          </label>
          <button className="btn-submit" type="submit">
            <span className="child">{loading ? <Loading /> : "Xác nhận"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
