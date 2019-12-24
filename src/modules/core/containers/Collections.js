/* eslint-disable */
/* prettier-ignore */
import _ from "lodash";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal, message, Button } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';

import * as paths from '../firebase-path';
import { collectionsList } from '../selectors';
import { withFirestore } from '../../common/utils';

import { Folders } from './Folders';
import { Requests } from './Requests';
import { CollectionForm } from '../components/collections/CollectionForm';
import { CollectionsListComponent } from '../components/collections/CollectionsList';
import { CollectionImportForm } from '../components/collections/CollectionImportForm';
import { useFela } from 'react-fela';
import { collectionToPostmanCollection } from '../utils/collectionToPostmanCollection';
import { saveAs } from 'file-saver';
import { CreateFolderForm } from '../components/collections/CreateFolderModal';
import { useTranslation } from 'react-i18next';

const style = {
  actions: {
    textAlign: 'right',
    padding: '10px',
    borderBottom: '1px solid #e7e7e7',
  },
};

function CollectionsComponent({
  firestore,
  workspace,
  collections,
  onRequestSelect,
  onRequestEdit,
}) {
  const listener = useMemo(() => CollectionsComponent.firedata(workspace), [
    workspace,
  ]);

  const { css } = useFela();
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [folderModal, setFolderModal] = useState(false);

  const close = () => setModal(false);
  const closeImportModal = () => setImportModal(false);
  const closeFolderModal = () => setFolderModal(false);

  useEffect(() => {
    firestore.setListener(listener);

    return function cleanup() {
      firestore.unsetListener(listener);
    };
  }, [listener]);

  const handle = data => {
    if (data.id) {
      firestore
        .set(paths.collections.one({ workspace, collection: data.id }), data)
        .then(res => setModal(false))
        .catch(err => message.error(err.message));
    } else {
      delete data.id; // Workaround for Firestore saving
      firestore
        .add(paths.collections.all({ workspace }), data)
        .then(res => setModal(false))
        .catch(err => message.error(err.message));
    }
  };

  const createDocAtPath = path => firestore.collection(path).doc();

  const createRequestsAtPath = async (reqs, path, batch) => {
    for (const request of reqs) {
      const newRequestRef = await createDocAtPath(path);

      batch.set(newRequestRef, request);
    }
  };

  const handleImport = async ({ name, requests, folders }) => {
    const batch = firestore.batch();
    const createdCollectionRef = await createDocAtPath(
      paths.collections.all({ workspace })
    );

    batch.set(createdCollectionRef, { name });
    const collection = createdCollectionRef.id;

    await createRequestsAtPath(
      requests,
      paths.requests.all({ workspace, collection }),
      batch
    );

    for (const folder of folders) {
      const createdFolderRef = await createDocAtPath(
        paths.folders.all({ workspace, collection })
      );
      const createdFolderId = createdFolderRef.id;

      batch.set(createdFolderRef, { name: folder.name });

      const requestsPath = paths.requests.all({
        workspace,
        collection,
        folder: createdFolderId,
      });
      await createRequestsAtPath(folder.requests || [], requestsPath, batch);
    }

    await batch.commit();
    closeImportModal();
  };

  const createFolder = (collectionId, data) => {
    firestore
      .add(paths.folders.all({ workspace, collection: collectionId }), data)
      .then(closeFolderModal)
      .catch(err => message.error(err.message));
  };

  const removeFolder = (collectionId, folderId) =>
    firestore.delete({
      collection: paths.folders.all({ workspace, collection: collectionId }),
      doc: folderId,
    });

  const remove = doc => {
    Modal.confirm({
      okText: 'Yes',
      okType: 'danger',
      title: 'Are you sure delete this collection?',
      onOk() {
        firestore.delete({
          collection: paths.collections.all({ workspace }),
          doc: doc.id || doc,
        });
      },
    });
  };

  const getCollectionDataByPath = async path => {
    const collection = await firestore.collection(path).get();
    return collection.docs.map(d => d.data());
  };

  const getFoldersData = async ({ workspace, collection }) => {
    const foldersCollectionRef = await firestore
      .collection(paths.folders.all({ workspace, collection }))
      .get();
    const foldersRequests = foldersCollectionRef.docs.map(async d => {
      const { name } = d.data();
      const requests = await getCollectionDataByPath(
        paths.requests.all({ workspace, collection, folder: d.id })
      );

      return { name, requests };
    });

    return Promise.all(foldersRequests);
  };

  const getCollectionData = async (workspace, { id, name }) => {
    const pathData = { workspace, collection: id };

    const [requests, folders] = await Promise.all([
      getCollectionDataByPath(paths.requests.all(pathData)),
      getFoldersData(pathData),
    ]);
    return {
      name,
      requests,
      folders,
    };
  };

  const exportCollection = async doc => {
    const collectionData = await getCollectionData(workspace, doc);
    const postmanCollection = collectionToPostmanCollection(collectionData);
    const json = JSON.stringify(postmanCollection, null, 4);
    const blob = new Blob([json], { type: 'application/json' });
    const fileName = `${doc.name}.json`;
    saveAs(blob, fileName);
  };

  const onSelect = collection => req => onRequestSelect({ ...req, collection });
  const onFolderSelect = collection => folder => req =>
    onRequestSelect({ ...req, collection, folder });

  return (
    <>
      <div className={css(style.actions)}>
        <Button type="link" onClick={() => setImportModal({})}>
          {t('sidebar.import_collection')}
        </Button>
        <Button type="link" onClick={() => setModal({})}>
          {t('sidebar.new_collection')}
        </Button>
      </div>

      <CollectionsListComponent
        onEdit={setModal}
        onRemove={remove}
        onExport={exportCollection}
        onAddFolder={setFolderModal}
        collections={collections}
        renderRequests={collection => (
          <Requests
            onEdit={onRequestEdit}
            onSelect={onSelect(collection.id)}
            workspace={workspace}
            collection={collection.id}
          />
        )}
        renderFolders={collection => (
          <Folders
            onRemoveFolder={removeFolder}
            onRequestEdit={onRequestEdit}
            onRequestSelect={onFolderSelect(collection.id)}
            workspace={workspace}
            collection={collection.id}
          />
        )}
      />

      <Modal footer={false} destroyOnClose onCancel={close} visible={modal}>
        <CollectionForm collection={modal} onSubmit={handle} />
      </Modal>
      <Modal
        footer={false}
        destroyOnClose
        onCancel={closeImportModal}
        visible={importModal}>
        <CollectionImportForm onSubmit={handleImport} />
      </Modal>
      <Modal
        footer={false}
        destroyOnClose
        onCancel={closeFolderModal}
        visible={folderModal}>
        <CreateFolderForm collection={folderModal} onSubmit={createFolder} />
      </Modal>
    </>
  );
}

CollectionsComponent.firedata = workspace => ({
  collection: paths.collections.all({ workspace }),
});

export const Collections = compose(
  withFirestore,
  connect((state, props) => ({
    collections: collectionsList(state, props),
  }))
)(CollectionsComponent);
