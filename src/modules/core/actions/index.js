/* eslint-disable */
/* prettier-ignore */
import { ACTIONS } from '../constants';

export const history = {
  clear: (workspace) => ({ type: ACTIONS.CLEAR_HISTORY, workspace }),
  remove: (keys, workspace) => ({ type: ACTIONS.REMOVE_HISTORY_ROWS, keys, workspace }),
};

export const configure = (config) => ({ type: ACTIONS.CONFIG_CHANGED, config });
export const setResponse = (response = {}) => ({ type: ACTIONS.RESPONSE_CHANGED, response });
export const done = ({ response, error }) => ({ type: ACTIONS.REQUEST_DONE, response, error });
export const process = (workspace, config, extra = {}) => ({ type: ACTIONS.REQUEST_PROCESSING, request: config, workspace, extra });
export const setProxy = (value) => ({ type: ACTIONS.SET_SETTINGS_PROXY, payload: value});
