import {
  CREATE_FILM,
  GET_FILMS,
  GET_SINGLE_FILM,
  UPDATE_FILM,
  REMOVE_FILM,
  SET_IS_EDIT,
  GET_FAVORITES,
  GET_WATCHED,
  GET_ALL_EPISODE,
} from "../constants/actionTypes";

export default (state = { films: [], isEdit: null, favorites: [], watched: [], film: null, episodes: [] }, action) => {
  switch (action.type) {
    case CREATE_FILM:
      return { ...state, films: [...state.films, action.payload] };
    case GET_FILMS:
      return { ...state, films: action.payload };
    case SET_IS_EDIT:
      return { ...state, isEdit: action.payload };
    case GET_FAVORITES:
      return { ...state, favorites: action.payload };
    case GET_WATCHED:
      return { ...state, watched: action.payload };
    case GET_SINGLE_FILM:
      return { ...state, film: action.payload };
    case REMOVE_FILM:
      return { ...state, films: state.films.filter((film) => film.id * 1 !== action.payload * 1) };
    case UPDATE_FILM:
      return { ...state, films: state.films.map((film) => (film.id === action.payload.id ? action.payload : film)) };
    case GET_ALL_EPISODE:
      return { ...state, episodes: action.payload };
    default:
      return state;
  }
};
