import * as types from "constants/actionTypes";

export default (state = [], { payload, type }) => {
  switch (type) {
    case types.CREATE_COMMENT:
      return [{ ...payload.data, type: payload.type }, ...state];
    case types.UPDATE_COMMENT:
      return state.map((cmt) => (cmt.id === payload.id ? payload : cmt));
    case types.DELETE_COMMENT:
      return state.filter((cmt) => cmt.id !== payload);
    case types.GET_ALL_COMMENT:
      return payload;
    default:
      return state;
  }
};
