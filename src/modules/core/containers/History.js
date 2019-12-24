/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {configure, history, setResponse } from '../actions';
import { workspaceHistory } from '../selectors/history';
import { HistoryList } from '../components/history/HistoryList';

export function HistoryComponent({ list, workspace, configure, setResponse, ...props }) {
  const clear = () => props.clear(workspace);
  const remove = (keys) => props.remove(keys, workspace);
  const restore = (config, response) => {
    setResponse(response);
    configure({ workspace, config });
  };

  return (
    <HistoryList
      list={list} 
      onClear={clear}
      onRemove={remove}
      onRestore={restore}
      workspace={workspace} 
    />
  );
}

export const History = compose(
  connect(
    (state, props) => ({
      list: workspaceHistory(state, props),
    }),
    dispatch => bindActionCreators({ configure, setResponse, clear: history.clear, remove: history.remove }, dispatch),
  ),
)(HistoryComponent);
