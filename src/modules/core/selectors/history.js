/* eslint-disable */
/* prettier-ignore */
import _ from "lodash";
import { createSelector } from "reselect";

import { props } from './common';

export const historyMap = ({ history }) => history;

export const workspaceHistory = createSelector(
  historyMap, props,
  (map = {}, { workspace }) => _.get(map, workspace, []),
);
