/* eslint-disable */
/* prettier-ignore */
import _ from "lodash";
import { createReducer } from 'redux-starter-kit';
import { firestoreReducer as firestore } from 'redux-firestore';
import { firebaseReducer as firebase } from 'react-redux-firebase';

import { ACTIONS, PROXY_TYPES } from '../constants';
import { workspaceHistory } from '../selectors/history';

const form = createReducer(
  {},
  {
    [ACTIONS.CONFIG_CHANGED]: (state, { config }) => Object.assign({}, config),
  }
);

const history = createReducer(
  {},
  {
    [ACTIONS.CLEAR_HISTORY]: (state, { workspace }) => ({
      ...state,
      [workspace]: [],
    }),
    [ACTIONS.REMOVE_REQUEST_FROM_HISTORY]: (state, { workspace }) => ({
      ...state,
      [workspace]: [],
    }),
    [ACTIONS.REQUEST_DONE]: (history, { workspace, ...rest }) => ({
      ...history,
      [workspace]: workspaceHistory({ history }, { workspace }).concat(rest),
    }),
    [ACTIONS.REMOVE_HISTORY_ROWS]: (history, { workspace, keys }) => {
      return {
        ...history,
        [workspace]: workspaceHistory({ history }, { workspace, keys }).filter(
          (item, i) => !keys.includes(i)
        ),
      };
    },
  }
);

const request = createReducer(
  {},
  {
    [ACTIONS.REQUEST_PROCESSING]: state => ({ loading: true }),
    [ACTIONS.CONFIG_CHANGED]: (state, { config }) => {
      return !config || _.isEmpty(config.config) ? {} : state;
    },
    [ACTIONS.RESPONSE_CHANGED]: (state, { response = {} }) => {
      return { ...state, response };
    },
    [ACTIONS.REQUEST_DONE]: (state, { response, error }) => ({
      loading: false,
      response,
      error,
    }),
  }
);

export const settings = createReducer(
  { proxy: PROXY_TYPES.disabled },
  {
    [ACTIONS.SET_SETTINGS_PROXY]: (state, { payload }) => ({
      ...state,
      proxy: payload,
    }),
  }
);

export const reducer = {
  history,
  form,
  request,
  firebase,
  firestore,
  settings,
};
