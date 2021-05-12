import {
  LOGIN,
  REGISTER,
  UPDATE_AVATAR,
  GET_USER,
  LOGOUT,
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE,
  ADD_FAVORITE,
  ADD_WATCHED,
  REMOVE_FAVORITE,
  SET_ROLE,
} from "../constants/actionTypes";
import * as api from "../apis";

export const registerUser = (user, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const { data } = await api.registerUser({
      username: user.username,
      password: user.password,
      name: user.name,
      email: user.email,
    });
    setLoading(false);

    return data;
  } catch (error) {
    setLoading(false);
    if (error.response.data.message) {
      return error.response.data.message;
    } else {
      return error.response.data;
    }
  }
};
export const loginUser = (user, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const { data } = await api.loginUser({ username: user.username, password: user.password });
    setLoading(false);

    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    setLoading(false);
    if (error.response.data.message) {
      return error.response.data.message;
    } else {
      return error.response.data;
    }
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    await api.logoutUser();
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
export const loginGoogle = (user, setLoading) => async (dispatch) => {
  try {
    setLoading((prev) => ({ ...prev, google: true }));
    const { data } = await api.loginGoogle(user);
    dispatch({ type: LOGIN_GOOGLE, payload: data });
    setLoading((prev) => ({ ...prev, google: false }));
    return { success: true };
  } catch (error) {
    setLoading((prev) => ({ ...prev, google: false }));
    return { success: false };
    console.log(error);
  }
};
export const loginFacebook = (user, setLoading) => async (dispatch) => {
  try {
    setLoading((prev) => ({ ...prev, facebook: true }));
    const { data } = await api.loginFacebook(user);
    dispatch({ type: LOGIN_FACEBOOK, payload: data });
    setLoading((prev) => ({ ...prev, facebook: false }));
    return { success: true };
  } catch (error) {
    setLoading((prev) => ({ ...prev, facebook: false }));
    return { success: false };
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
