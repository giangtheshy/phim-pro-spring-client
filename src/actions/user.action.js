import {
  LOGIN,
  REGISTER,
  UPDATE_AVATAR,
  GET_USER,
  LOGOUT,
  CHECK_LOGIN,
  LOGIN_GOOGLE,
  ADD_FAVORITE,
  ADD_WATCHED,
  REMOVE_FAVORITE,
  SET_ROLE,
} from "../constants/actionTypes";
import * as api from "../apis";

export const registerUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.registerUser({
      username: user.username,
      password: user.password,
      name: user.name,
      email: user.email,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.loginUser({ username: user.username, password: user.password });

    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    return error.response.data.message;
  }
};
export const logoutUser = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
export const checkLogin = () => async (dispatch) => {
  try {
    const { data } = await api.checkLogin();

    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateAvatar = (avatar) => async (dispatch) => {
  try {
    await api.updateAvatar(avatar);

    dispatch({ type: UPDATE_AVATAR, payload: avatar.avatar });
  } catch (error) {
    console.log(error);
  }
};
export const loginGoogle = (user) => async (dispatch) => {
  try {
    const { data } = await api.loginGoogle(user);
    dispatch({ type: LOGIN_GOOGLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addFavorite = (idFilm) => async (dispatch) => {
  try {
    await api.addFavorite(idFilm);
    dispatch({ type: ADD_FAVORITE, payload: idFilm });
  } catch (error) {
    console.log(error);
  }
};
export const addWatched = (idFilm) => async (dispatch) => {
  try {
    await api.addWatched(idFilm);
    dispatch({ type: ADD_WATCHED, payload: idFilm });
  } catch (error) {
    console.log(error);
  }
};
export const removeFavorite = (idFilm) => async (dispatch) => {
  try {
    await api.removeFavorite(idFilm);
    dispatch({ type: REMOVE_FAVORITE, payload: idFilm });
  } catch (error) {
    console.log(error);
  }
};
export const setRole = (role) => async (dispatch) => {
  dispatch({ type: SET_ROLE, payload: role });
};
