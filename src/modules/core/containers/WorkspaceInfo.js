import React, { useEffect, useMemo, useState } from 'react';
import { compose } from 'redux';
import { withFirestore } from '../../common/utils';
import { workspace } from '../selectors';
import { connect } from 'react-redux';
import { ContributorsLIst } from '../components/workspace-info/ContributorsList';
import { message, Modal } from 'antd';
import { WorkspaceModalForm } from '../components/workspace-info/WorkspaceModal';
import * as paths from '../firebase-path';
import { useTranslation } from 'react-i18next';
import { EnvironmentList } from '../components/workspace-info/EnvironmentList';
import { EnvironmentForm } from '../components/workspace-info/EnvironmentForm';
import get from 'lodash/get';

export const WorkspaceInfoComponent = ({
  workspace,
  workspaceData,
  firestore,
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showEnvModal, setShowEnvModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name = '', contributors = [] } = workspaceData;
  const listener = useMemo(
    () => ({
      doc: workspace,
      collection: 'workspaces',
    }),
    [workspace]
  );

  const getWorkspaceRefById = id =>
    firestore.collection(paths.workspaces.all()).doc(id);

  const addContributor = ({ email }) =>
    new Promise((resolve, reject) => {
      if (contributors.includes(email)) {
        throw new Error(
          t('workspace.errors.email_already_in_contributors_list')
        );
      }
      const ref = getWorkspaceRefById(workspace);
      ref
        .update({
          contributors: firestore.FieldValue.arrayUnion(email),
        })
        .then(resolve)
        .catch(reject);
    });

  const removeContributor = email => {
    if (!contributors.includes(email)) {
      message.error(t('workspace.errors.email_not_in_contributors_list'));
      return;
    }
    const ref = getWorkspaceRefById(workspace);
    setLoading(true);
    ref
      .update({
        contributors: firestore.FieldValue.arrayRemove(email),
      })
      .then(() => {
        message.success('contributor has been removed from this workspace');
      })
      .catch(err => {
        message.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const addEnvironment = ({ name, params }) => {
    const ref = getWorkspaceRefById(workspace);
    return firestore.runTransaction(tr => {
      return tr.get(ref).then(doc => {
        const newEnvs = doc.data().envs;
        newEnvs[name] = params.reduce((acc, param) => {
          acc[param.name] = param.value || '';
          return acc;
        }, {});
        tr.update(ref, { envs: newEnvs });
        return name + ' ' + t('workspace.env_created');
      });
    });
  };

  const updateEnvironment = ({ name, params }, initialName) => {
    const ref = getWorkspaceRefById(workspace);
    return firestore.runTransaction(tr => {
      return tr.get(ref).then(doc => {
        const newEnvs = doc.data().envs;
        newEnvs[name] = params.reduce((acc, param) => {
          acc[param.name] = param.value;
          return acc;
        }, {});
        if (initialName !== name) {
          delete newEnvs[initialName];
        }
        tr.update(ref, { envs: newEnvs });
        return name + ' ' + t('workspace.env_updated');
      });
    });
  };

  const closeModal = () => setShowModal(false);
  const closeEnvModal = () => setShowEnvModal(false);
  const openModal = () => setShowModal(true);
  const openEnvModal = data => setShowEnvModal(data);

  useEffect(() => {
    firestore.setListener(listener);
    return function cleanup() {
      firestore.unsetListener(listener);
    };
    // eslint-disable-next-line
  }, [workspace]);

  return (
    <>
      <div className="p-2">
        <h3>
          {t('general.name')}: {name}
        </h3>
        <ContributorsLIst
          loading={loading}
          contributors={contributors}
          onAddContributor={openModal}
          onRemoveContributor={removeContributor}
        />
        <EnvironmentList
          envs={workspaceData.envs}
          onAddEnvironment={() =>
            openEnvModal({
              title: t('workspace.add_env'),
              data: {},
              submit: addEnvironment,
            })
          }
          onEditEnvironment={data =>
            openEnvModal({
              title: t('workspace.update_env') + ' ' + data.name,
              data: { ...data },
              submit: updateEnvironment,
            })
          }
        />
      </div>
      <Modal
        visible={showModal}
        footer={null}
        onCancel={closeModal}
        title="Add user to workspace"
        destroyOnClose>
        <WorkspaceModalForm onSubmit={addContributor} close={closeModal} />
      </Modal>
      <Modal
        visible={!!showEnvModal}
        footer={null}
        onCancel={closeEnvModal}
        title={get(showEnvModal, 'title', '')}
        destroyOnClose>
        <EnvironmentForm
          close={closeEnvModal}
          data={showEnvModal ? showEnvModal.data : {}}
          onSubmit={showEnvModal ? showEnvModal.submit : addEnvironment}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  workspaceData: workspace(state, props),
});

export const WorkspaceInfo = compose(
  withFirestore,
  connect(mapStateToProps, null)
)(WorkspaceInfoComponent);
