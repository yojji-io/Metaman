/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import { createSelector } from 'reselect';

import { props, firebaseMap, firebaseList } from './common';
import * as paths from '../firebase-path';

export const collectionsMap = createSelector(
  firebaseMap, props, 
  (map, props) => _.get(map, paths.collections.all(props)),
);

export const collectionsList = createSelector(
  firebaseList, props, 
  (list, props) => _.get(list, paths.collections.all(props)),
);
