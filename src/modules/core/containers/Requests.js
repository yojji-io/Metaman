/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import { Button, Modal } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect, useMemo } from 'react';

import * as paths from '../firebase-path';
import { requestsList } from '../selectors';
import { withFirestore } from '../../common/utils';
import { RequestsList } from '../components/collections/RequestsList';
import { useTranslation } from "react-i18next";

function RequestsComponent({ firestore, workspace, collection, folder, requests, onSelect, onEdit }) {
  const { t } = useTranslation();
  const listener = useMemo(
    () => RequestsComponent.firedata({ workspace, collection, folder }),
    [workspace, collection, folder]);

  useEffect(() => {
    firestore.setListener(listener);

    return function cleanup() {
      firestore.unsetListener(listener);
    }
  }, [listener]);
  
  const remove = (doc) => {
    Modal.confirm({
      okText: t('general.yes'),
      cancelText: t('button.cancel'),
      okType: 'danger',
      title: t('general.are_you_sure_delete_this_request'),
      onOk() {
        firestore.delete({
          doc: doc.id || doc,
          collection: paths.requests.all({ workspace, collection, folder }),
        });
      }
    });
  };

  return (
    <RequestsList 
      onEdit={onEdit} 
      onRemove={remove} 
      onSelect={onSelect} 
      requests={requests} 
    />
  );
}

RequestsComponent.firedata = (props) => ({
  collection: paths.requests.all(props),
});

export const Requests = compose(
  withFirestore,
  connect((state, props) => ({
    requests: requestsList(state, props),
  })),
)(RequestsComponent);
