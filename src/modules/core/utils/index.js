/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';

export const toArray = obj => _.chain(obj)
  .map((key, value) => ({ key, value }))
  .value();

export const toObject = params => 
  _.chain(params)
    .filter('active')
    .keyBy('name')
    .mapValues('value')
    .value();
