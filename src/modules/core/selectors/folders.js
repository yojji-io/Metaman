/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import { createSelector } from 'reselect';

import { props, firebaseMap, firebaseList } from './common';
import * as paths from '../firebase-path';

export const foldersMap = createSelector(
  firebaseMap, props, 
  (map, props) => _.get(map, paths.folders.all(props)),
);

export const foldersList = createSelector(
  firebaseList, props, 
  (list, props) => _.get(list, paths.folders.all(props)),
);
