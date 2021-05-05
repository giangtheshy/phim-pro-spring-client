import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import * as apis from "apis";
import "./VnPayReturn.scss";

const VnPayReturn = () => {
  const [status, setStatus] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchVnPayReturn = async () => {
      const { data } = await apis.returnVnPay(history.location.search);
      if (data.code === "00") {
        setStatus("success");
      } else {
        setStatus("failure");
      }
    };
    fetchVnPayReturn();
  }, []);
  return (
    <section className="return-vnpay">
      <div className="center">
        {status === "success" ? (
          <div className="alert-success">
            <AiOutlineCheckCircle />
            <span>Thanh toán thành công!</span>
          </div>
        ) : (
          <div className="alert-failure">
            <VscError />
            <span>Thanh toán thất bại!</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default VnPayReturn;
