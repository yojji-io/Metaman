/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {Modal, message, Button, Collapse, Dropdown, Icon} from 'antd';
import React, { useEffect, useState, useMemo } from 'react';

import * as paths from '../firebase-path';
import { foldersList } from '../selectors';
import { withFirestore } from '../../common/utils';

import { Requests } from './Requests';
import { FolderCard } from '../components/collections/FolderCard';
import { CollectionForm } from '../components/collections/CollectionForm';

const { Panel } = Collapse;

function FoldersComponent({ firestore, workspace, collection, folders, onRequestSelect, onRequestEdit, onRemoveFolder }) {
  const listener = useMemo(
    () => FoldersComponent.firedata(workspace, collection),
    [workspace]);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    firestore.setListener(listener);

    return function cleanup() {
      firestore.unsetListener(listener);
    }
  }, [listener]);

  const handle = (data) => {
    if (data.id) {
      firestore.set(paths.folders.one({
        collection, workspace, folder: data.id,
      }), data)
        .then((res) => setModal(false))
        .catch((err) => message.error(err.message))
    } else {
      delete data.id; // Workaround for Firestore saving
      firestore.add(paths.folders.all({ workspace, collection }), data)
        .then((res) => setModal(false))
        .catch((err) => message.error(err.message))
    }
  };

  const close = () => setModal(false);
  const remove = doc => firestore.delete({
    collection: paths.folders.all({ collection, workspace }), doc: doc.id || doc
  });

  const extra = (collection, folder) => (
      <Icon type="delete" onClick={(e) => {
        e.stopPropagation();
        onRemoveFolder(collection, folder)
      }}/>
  );

    return (
    <>
      <Collapse bordered={false}>
        {_.map(folders, (folder, key) =>
         <Panel header={folder.name} key={key} extra={extra(collection, folder.id)}>
            <FolderCard
              folder={folder}
              key={key}
              onEdit={onRequestEdit}
              collection={collection}
              renderRequests={folder =>
                <Requests
                  onRemove={remove}
                  onSelect={onRequestSelect(folder.id)}
                  onEdit={setModal}
                  folder={folder.id}
                  collection={collection}
                  workspace={workspace}
                />
              }
            />
         </Panel>
        )}
      </Collapse>

      <Modal footer={false} destroyOnClose onCancel={close} visible={modal}>
        <CollectionForm collection={modal} onSubmit={handle} />
      </Modal>
    </>
  );
}

FoldersComponent.firedata = (workspace, collection) => ({
  collection: paths.folders.all({ workspace, collection }),
});

export const Folders = compose(
  withFirestore,
  connect((state, props) => ({
    folders: foldersList(state, props),
  })),
)(FoldersComponent);
