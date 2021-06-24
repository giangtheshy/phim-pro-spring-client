import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MessengerCustomerChat from "react-messenger-customer-chat";

import { checkLogin, setRole } from "./actions/user.action";
import { getFilms } from "./actions/film.action";

import "./scss/index.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Film from "./pages/Film/Film";
import Manager from "./pages/Manager/Manager";
import OddFilm from "./pages/OddFilm/OddFilm";
import SeriesFilm from "./pages/SeriesFilm/SeriesFilm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Payment from "pages/Payment/Payment";
import VnPayReturn from "pages/VnPayReturn/VnPayReturn";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/ResetPassword/ResetPassword";
import Watch from "pages/Watch/Watch";
import Country from "pages/Country/Country";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.users.role);
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      dispatch(checkLogin());
    }
    dispatch(getFilms());
  }, [dispatch]);
  useEffect(() => {
    dispatch(setRole(role));
  }, [role, dispatch]);
  return (
    <div className="app">
      <Router>
        <Header />
        <section className="app__content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/oddfilm" component={OddFilm} />
            <Route path="/seriesfilm" component={SeriesFilm} />
            <Route path="/account" exact component={Login} />
            <Route path="/account/payment" component={Payment} />
            <Route path="/payment/result" component={VnPayReturn} />
            <Route path="/manager" component={Manager} />
            <Route path="/film/:id/:ep" component={Watch} />
            <Route path="/film/:id" component={Film} />
            <Route path="/country/:country" component={Country} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />
          </Switch>
        </section>
        <Footer />
        <MessengerCustomerChat pageId="107305324872546" appId="1877984012376416" />
      </Router>
    </div>
  );
};

export default App;
