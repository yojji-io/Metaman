/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { useState } from 'react';

import { collectionsList, foldersList } from '../selectors';

import { RequestSavingForm } from '../components/collections/RequestSavingForm';
import { withFirestore } from "../../common/utils";

export function RequestSavingComponent(props) {
  return (
    <RequestSavingForm {...props} />
  );
}

const RequestSavingWrapper = compose(
  withFirestore,
  connect((state, { changes, request = {}, ...props }) => ({
    collections: collectionsList(state, props),
    folders: !(changes.collection || request.collection) 
      ? [] : foldersList(state, { ...props, ...changes  }),
  })),
)(RequestSavingComponent);

/** Workaround for work with Form and Store */

export function RequestSaving({ _id, workspace, onSubmit, firestore, ...props }) {
  const [ changes, setChanges ] = useState({});

  return (
    <RequestSavingWrapper
      {...props}
      changes={changes}
      onSubmit={onSubmit}
      onChange={setChanges}
      workspace={workspace}
    />
  );
}
