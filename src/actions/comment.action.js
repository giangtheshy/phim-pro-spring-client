import * as types from "constants/actionTypes";
import * as apis from "apis";

export const getAllComments = (id) => async (dispatch) => {
  try {
    const { data } = await apis.getAllComments(id);
    dispatch({ type: types.GET_ALL_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createComment = (comment) => async (dispatch) => {
  try {
    const { data } = await apis.createComment(comment);
    dispatch({ type: types.CREATE_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateComment = (comment) => async (dispatch) => {
  try {
    await apis.updateComment(comment);
    dispatch({ type: types.UPDATE_COMMENT, payload: comment });
  } catch (error) {
    console.log(error);
  }
};
export const deleteComment = (id) => async (dispatch) => {
  try {
    await apis.deleteComment(id);
    dispatch({ type: types.DELETE_COMMENT, payload: id });
  } catch (error) {
    console.log(error);
  }
};
