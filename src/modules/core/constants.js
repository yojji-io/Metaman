/* eslint-disable */
/* prettier-ignore */
import {DEFAULT_PROXY_URL} from "../common/constants";

const hasLocalProxy = process.env.REACT_APP_HAS_LOCAL_PROXY;

export const AVAIL_TRANSLATIONS = ['en', 'ru'];

export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
  HEAD: 'head',
  OPTIONS: 'options',
};

export const ACTIONS = {
  CLEAR_HISTORY: 'CLEAR_HISTORY',
  REMOVE_HISTORY_ROWS: 'REMOVE_HISTORY_ROWS',

  CONFIG_CHANGED: 'CONFIG_CHANGED',
  RESPONSE_CHANGED: 'RESPONSE_CHANGED',

  REQUEST_DONE: 'REQUEST_DONE', 
  REQUEST_PROCESSING: 'REQUEST_PROCESSING',

  SET_SETTINGS_PROXY: 'SET_SETTINGS_PROXY'
};

export const CONTENT_TYPES = {
  'application/json': 'application/json',
  'urlencoded': 'application/x-www-form-urlencoded',
};

export const AUTH_TYPES = {
  bearer: 'bearer',
  basic: 'basic',
};

export const AUTH_DEFAULTS = {
  [AUTH_TYPES.basic]: {
      type: AUTH_TYPES.basic,
      [AUTH_TYPES.basic]: { username: '', password: '' },
    },
  [AUTH_TYPES.bearer]: {
      type: AUTH_TYPES.bearer,
      [AUTH_TYPES.bearer]: { token: '' },
    },
};

export const PROXY_TYPES = {
  disabled: {
    type: 'disabled',
    value: null,
  },
  default: {
    type: 'default',
    value: DEFAULT_PROXY_URL,
  },
  custom: {
    type: 'custom',
    value: '',
  }
};

if (hasLocalProxy) {
  PROXY_TYPES['local'] = {
    type: 'local',
    value: process.env.REACT_APP_PROXY_URL,
  }
}

export const POSSIBLE_PROXY_TYPES = Object.keys(PROXY_TYPES);

export const FIREBASE_AUTH_TYPES = {
  'GOOGLE': 'google.com',
  'GIT': 'github.com'
};
