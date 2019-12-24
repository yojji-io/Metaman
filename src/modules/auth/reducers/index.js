/* eslint-disable */
/* prettier-ignore */
import { createReducer } from "redux-starter-kit";

export const reducer = ({
  "@features/auth/__init__": createReducer(false, {
    "@@INIT": (state = false) => true,
  }),
});