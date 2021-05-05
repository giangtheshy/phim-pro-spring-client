import { combineReducers } from "redux";

import films from "./film.reducer";
import users from "./user.reducer";
import comments from "./comment.reducer";

export const reducers = combineReducers({ films, users, comments });
