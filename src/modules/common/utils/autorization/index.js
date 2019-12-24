/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';

export const isAuthenticated = (user) => !!user;
export const isGuest = (user) => !user || _.isEmpty(user);
