import * as types from "../constants/actionTypes";
import * as api from "../apis";

export const createFilm = (film) => async (dispatch) => {
  try {
    const {
      data
    } = await api.createFilm(film);
    dispatch({
      type: types.CREATE_FILM,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const getFilms = () => async (dispatch) => {
  try {
    const {
      data
    } = await api.getFilms();
    dispatch({
      type: types.GET_FILMS,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateFilm = (film) => async (dispatch) => {
  try {
    const {
      data
    } = await api.updateFilm(film);
    dispatch({
      type: types.UPDATE_FILM,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const removeFilm = (id) => async (dispatch) => {
  try {
    await api.deleteFilm(id);
    dispatch({
      type: types.REMOVE_FILM,
      payload: id
    });
  } catch (error) {
    console.log(error);
  }
};
export const getSingleFilm = (id) => async (dispatch) => {
  try {
    if (id) {
      const {
        data
      } = await api.getSingleFilm(id);
      dispatch({
        type: types.GET_SINGLE_FILM,
        payload: data
      });
    } else {
      dispatch({
        type: types.GET_SINGLE_FILM,
        payload: null
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const setIsEdit = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.SET_IS_EDIT,
      payload: id
    });
  } catch (error) {
    console.log(error);
  }
};
export const getFavorites = () => async (dispatch) => {
  try {
    const {
      data
    } = await api.getFavorites();
    dispatch({
      type: types.GET_FAVORITES,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};
export const getWatched = () => async (dispatch) => {
  try {
    const {
      data
    } = await api.getWatched();
    dispatch({
      type: types.GET_WATCHED,
      payload: data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllEpisodes = (id) => async (dispatch) => {
  try {
    if (id) {

      const { data } = await api.getAllEpisodes(id);
      dispatch({ type: types.GET_ALL_EPISODE, payload: data });
    } else {
      dispatch({ type: types.GET_ALL_EPISODE, payload: [] });
    }
  } catch (error) {
    console.log(error);
  }
};