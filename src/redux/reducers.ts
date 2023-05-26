import { combineReducers } from "redux";
import formReducer from "./ducks/form_slice";

export const rootReducer = combineReducers({
  forms: formReducer,
});
