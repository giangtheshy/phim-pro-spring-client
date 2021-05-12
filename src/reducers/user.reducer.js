import {
  LOGIN,
  REGISTER,
  UPDATE_AVATAR,
  LOGIN_FACEBOOK,
  LOGOUT,
  CHECK_LOGIN,
  LOGIN_GOOGLE,
  ADD_WATCHED,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_ROLE,
} from "../constants/actionTypes";

export default (
  userState = { username: null, token: null, role: null, avatar: null, favorites: null, watched: null, type: null },
  action
) => {
  switch (action.type) {
    case LOGIN:
    case LOGIN_GOOGLE:
    case LOGIN_FACEBOOK:
      return {
        username: action.payload.name,
        token: action.payload.authenticationToken,
        role: action.payload.role,
        avatar: action.payload.avatar,
        favorites: action.payload.favorites,
        watched: action.payload.watched,
        type: action.payload.type,
      };
    case LOGOUT:
      return { username: null, token: null, role: null, avatar: null };
    case CHECK_LOGIN:
      return { user: action.payload.data, token: action.payload.token };
    case ADD_FAVORITE:
      return { ...userState, favorites: [...userState.favorites, action.payload] };
    case ADD_WATCHED:
      return { ...userState, watched: [...userState.watched, action.payload] };
    case REMOVE_FAVORITE:
      return { ...userState, favorites: userState.favorites.filter((item) => item * 1 !== action.payload * 1) };
    case SET_ROLE:
      return { ...userState, role: action.payload };
    case UPDATE_AVATAR:
      return { ...userState, avatar: action.payload };
    default:
      return userState;
  }
};
