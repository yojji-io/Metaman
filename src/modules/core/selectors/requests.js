/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import { createSelector } from 'reselect';

import { props, firebaseMap, firebaseList } from './common';
import * as paths from '../firebase-path';

export const requestForm = ({ form }) => form;

export const requestResponse = ({ request }) => request;

export const requestsMap = createSelector(
  firebaseMap, props, 
  (map, props) => _.get(map, paths.requests.all(props)),
);

export const requestsList = createSelector(
  firebaseList, props, 
  (list, props) => _.get(list, paths.requests.all(props)),
);
