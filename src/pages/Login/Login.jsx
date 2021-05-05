import React, { useState, useEffect } from "react";
import { HiEye, HiHeart } from "react-icons/hi";
import { GiPopcorn } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser, logoutUser, registerUser, loginGoogle, updateAvatar } from "actions/user.action";
import { getFavorites, getWatched } from "actions/film.action";

import ListFilm from "components/utils/ListFilm/ListFilm";
import storage from "apis/firebase";

import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const favorites = useSelector((state) => state.films.favorites);
  const watched = useSelector((state) => state.films.watched);
  const [active, setActive] = useState("heart");
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [dataReg, setDataReg] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
    passwordCheck: "",
  });
  const [modalAvatar, setModalAvatar] = useState(false);
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const history = useHistory();
  useEffect(() => {
    if (user.username) {
      dispatch(getFavorites());
      dispatch(getWatched());
    }
  }, [user.username]);
  const handleSuccess = async (res) => {
    const { name, imageUrl, email, googleId } = res.profileObj;
    const token = res.tokenId;
    dispatch(loginGoogle({ name, imageUrl, googleId, email, token }));
    history.push("/");
  };
  const handleFailure = () => {
    alert("Some errors were occur when login");
  };
  const handleClickLogout = async () => {
    dispatch(logoutUser());
    localStorage.removeItem("isLoggedIn");
    history.push("/account");
  };
  const handleOnchangeLogin = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleOnchangeRegister = (e) => {
    setDataReg({ ...dataReg, [e.target.name]: e.target.value });
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (userData.username !== "" && userData.password !== "") {
      try {
        const message = await dispatch(loginUser(userData));
        if (!message) {
          localStorage.setItem("isLoggedIn", "1");
          history.push("/");
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("must fill in full fields");
    }
    setUserData({ email: "", password: "" });
  };
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (
      dataReg.name !== "" &&
      dataReg.username !== "" &&
      dataReg.email !== "" &&
      dataReg.password !== "" &&
      dataReg.passwordCheck !== "" &&
      dataReg.passwordCheck === dataReg.password &&
      userData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9])[0-9a-zA-Z]{8,}$/)
    ) {
      if (dataReg.password.length >= 5 && dataReg.username.length >= 5) {
        const mess = await dispatch(registerUser(dataReg));
        alert(mess);
      }
    } else {
      alert("Please Fill in full fields and correct type");
    }
    setDataReg({ email: "", name: "", password: "", username: "", passwordCheck: "" });
  };
  const handleChangeFile = (e) => {
    const value = e.target.files[0];
    if (value) {
      const uploadTask = storage.ref(`avatar/${value.name}`).put(value);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => console.log(error),
        () => {
          storage
            .ref("avatar")
            .child(value.name)
            .getDownloadURL()
            .then((url) => {
              setImage(url);
            });
        }
      );
    }
  };

  const handleChangeAvatar = (e) => {
    e.preventDefault();
    console.log(image);
    if (image) {
      dispatch(updateAvatar({ avatar: image }));
      setModalAvatar(false);
    }
  };
  if (user.username) {
    return (
      <section className="account">
        {modalAvatar && (
          <div className="modal-avatar">
            <form onSubmit={handleChangeAvatar}>
              <button type="button" className="logout-btn" onClick={() => setModalAvatar(false)}>
                <span className="child">Đóng</span>
              </button>
              {image && <img src={image} alt="avatar" />}
              <label htmlFor="file">Chọn ảnh từ máy của bạn:</label>
              {progress > 0 && <span className="bold main-clr">{progress}</span>}
              <input type="file" onChange={handleChangeFile} id="file" />
              <button type="submit" className="btn-submit">
                <span className="child"> Xác nhận</span>
              </button>
            </form>
          </div>
        )}
        <button className="logout-btn" onClick={handleClickLogout}>
          <span className="child"> Đăng Xuất</span>
        </button>
        <button className="change-avatar" onClick={() => setModalAvatar(!modalAvatar)}>
          <span className="child">Thay đổi ảnh đại diện</span>
        </button>
        {user.type !== "premium" && (
          <button className="upgrade" onClick={() => history.push("/account/payment")}>
            <span className="child">Nạp lần đầu</span>
          </button>
        )}
        <div className="btn-group">
          <button className={`add-fav ${active === "heart" ? "active" : ""}`} onClick={() => setActive("heart")}>
            <span className="child">
              <HiHeart /> Yêu Thích
            </span>
          </button>
          <button className={`watch ${active === "eye" ? "active" : ""}`} onClick={() => setActive("eye")}>
            <span className="child">
              <HiEye /> Đã Xem
            </span>
          </button>
        </div>
        <ListFilm type="row" films={active === "heart" ? favorites : watched} />
      </section>
    );
  }
  return (
    <section className="login">
      <div className="login">
        <div className="logo">
          <GiPopcorn className="icon-logo" />
          <span className="bold orange-text">PHIM</span>PRO
        </div>
        <p className="title">Đăng nhập để trải nghiệm tốt hơn</p>
        <div className="btn-group">
          {!isLogin && (
            <button className="btn-login" onClick={() => setIsLogin(true)}>
              <span className="child"> Đăng Nhập</span>
            </button>
          )}
          {isLogin && (
            <button className="btn-register" onClick={() => setIsLogin(false)}>
              <span className="child"> Đăng Ký</span>
            </button>
          )}
        </div>
        {isLogin ? (
          <form onSubmit={handleSubmitLogin}>
            <label htmlFor="username" className="text-input">
              <input
                type="text"
                name="username"
                id="username"
                value={userData.username}
                onChange={handleOnchangeLogin}
                placeholder="User name"
              />
            </label>
            <label htmlFor="password" className="text-input">
              <input
                type="password"
                name="password"
                id="password"
                value={userData.password}
                onChange={handleOnchangeLogin}
                placeholder="Password"
              />
            </label>
            <button type="submit" className="btn-submit">
              <span className="child"> Đăng Nhập</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitRegister}>
            <label htmlFor="emailReg" className="text-input">
              <input
                type="text"
                name="email"
                id="emailReg"
                value={dataReg.email}
                onChange={handleOnchangeRegister}
                placeholder="Email"
              />
            </label>
            <label htmlFor="usernameReg" className="text-input">
              <input
                type="text"
                name="username"
                id="usernameReg"
                value={dataReg.username}
                onChange={handleOnchangeRegister}
                placeholder="User name"
              />
            </label>
            <label htmlFor="passwordReg" className="text-input">
              <input
                type="password"
                name="password"
                id="passwordReg"
                value={dataReg.password}
                onChange={handleOnchangeRegister}
                placeholder="Password"
              />
            </label>
            <label htmlFor="passwordRegCheck" className="text-input">
              <input
                type="password"
                name="passwordCheck"
                id="passwordRegCheck"
                value={dataReg.passwordCheck}
                onChange={handleOnchangeRegister}
                placeholder="Password"
              />
            </label>
            <label htmlFor="name" className="text-input">
              <input
                type="text"
                name="name"
                id="name"
                value={dataReg.name}
                onChange={handleOnchangeRegister}
                placeholder="Họ Tên"
              />
            </label>
            <label htmlFor="photo-url" className="photo-url"></label>
            <button type="submit" className="btn-submit-register">
              <span className="child"> Đăng Ký</span>
            </button>
          </form>
        )}

        {/* <GoogleLogin
          clientId="467571315756-vigfi3qh89vvgbeqhduotlr2jso13gl5.apps.googleusercontent.com"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
          render={(props) => (
            <button className="login-btn" onClick={props.onClick} disabled={props.disabled}>
              <ImGooglePlus className="icon" /> Đăng Nhập Bằng Google
            </button>
          )}
        /> */}
      </div>
    </section>
  );
};

export default Login;
