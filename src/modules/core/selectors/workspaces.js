import _ from 'lodash';
import { createSelector } from 'reselect';

import { firebaseMap, firebaseList, routeId, props } from './common';

export const workspacesMap = createSelector(firebaseMap, map => map.workspaces);

export const workspacesList = createSelector(
  firebaseList,
  list => list.workspaces
);

export const currentWorkspace = createSelector(
  workspacesMap,
  routeId,
  (map = {}, id) => _.assign(map[id], { id })
);

export const workspace = createSelector(
  workspacesMap,
  props,
  (map = {}, { workspace }) => map[workspace]
);
