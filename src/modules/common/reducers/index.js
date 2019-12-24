/* eslint-disable */
/* prettier-ignore */
import { createReducer } from "redux-starter-kit";

export const reducer = ({
  "@features/common/__init__": createReducer(false, {
    "@@INIT": (state = false) => true,
  }),
});