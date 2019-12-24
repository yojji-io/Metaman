import { connect } from 'react-redux';
import { Modal, message } from 'antd';
import { compose, bindActionCreators } from 'redux';
import React, { useEffect, useMemo, useState } from 'react';

import * as actions from '../actions';
import * as paths from '../firebase-path';
import { requestForm, requestResponse, settingsProxy } from '../selectors';
import { withFirestore } from '../../common/utils';
import { autorize } from '../../common/hocs/autorize';
import { currentWorkspace } from '../selectors/workspaces';
import { isAuthenticated } from '../../common/utils/autorization';

import { RequestSaving } from './RequestSaving';
import { RequestForm } from '../components/request/RequestForm';
import { ProjectView } from './ProjectView';
import { WorkspaceSider } from './WorkspaceSider';
import { ResponseView } from '../components/request-view/ResponseView';

export function WorkspaceComponent({
  response,
  workspace,
  firestore,
  match: { params },
  form = {},
  configure,
  setResponse,
  setProxy,
  proxy,
  process,
}) {
  const [modal, setModal] = useState(null);
  const [request, setRequest] = useState({});

  useEffect(() => setRequest(form), [form]);

  const listener = useMemo(() => WorkspaceComponent.firedata(params.id), [
    params.id,
  ]);

  useEffect(() => {
    firestore.setListener(listener);
    return function cleanup() {
      firestore.unsetListener(listener);
    };
    // eslint-disable-next-line
  }, [listener]);

  const updateRequest = (path, req) => firestore.set(path, req);
  const createRequest = (path, req) => firestore.add(path, req);

  const handle = payload => {
    // eslint-disable-next-line no-unused-vars
    const { id, folder, ...input } = payload;
    const path = paths.requests.all({
      workspace: workspace.id,
      collection: input.collection,
      folder,
    });

    createRequest(path, input)
      .then(() => setModal(false))
      .catch(err => message.error(err.message));
  };

  const onRequestSelect = ({ name, config, id, collection, folder }) => {
    configure({
      workspace: workspace.id,
      collection,
      config,
      id,
      folder,
      name,
      env,
    });
    setResponse();
  };

  const onClear = () => {
    configure({ workspace: workspace.id, config: {}, id: null });
    setResponse();
  };

  const onSaveAs = () => setModal(true);

  // eslint-disable-next-line no-unused-vars
  const onSave = ({ id, ...req }) => {
    if (request.id && request.collection) {
      const { collection, folder, name } = request;
      const path = paths.requests.one({
        workspace: workspace.id,
        collection,
        folder,
        request: request.id,
      });
      updateRequest(path, { name: name || req.url, config: req })
        .then(() => message.success('Changes saved'))
        .catch(err => message.error(err.message));
    } else {
      onSaveAs();
    }
  };

  const env = form.env || null;
  const setEnv = env => configure({ ...form, env });
  const onExecute = request =>
    process(workspace.id, {
      ...request,
      proxy: proxy.value,
      env: workspace.envs ? workspace.envs[env] : {},
    });
  return (
    <>
      <ProjectView
        sider={
          <WorkspaceSider
            onRequestSelect={onRequestSelect}
            workspace={workspace.id}
            onRequestEdit={data => {
              configure(data);
              setModal(true);
            }}
          />
        }
        content={
          <RequestForm
            _id={form.id}
            proxy={proxy}
            env={env}
            setEnv={setEnv}
            onExecute={onExecute}
            workspace={params.id}
            request={form.config}
            onSaveAs={onSaveAs}
            onSave={onSave}
            renderResponse={() => <ResponseView response={response} />}
            onChange={config =>
              configure({
                workspace: workspace.id,
                config,
                collection: request.collection,
                id: request.id,
                folder: request.folder,
                name: request.name,
                env,
              })
            }
            onClear={onClear}
            onProxyChange={setProxy}
          />
        }
      />

      <Modal
        footer={null}
        onCancel={() => setModal(false)}
        destroyOnClose={true}
        visible={modal}>
        <RequestSaving
          _id={request.id}
          request={request}
          onSubmit={handle}
          workspace={params.id}
        />
      </Modal>
    </>
  );
}

WorkspaceComponent.firedata = doc => ({
  doc,
  collection: 'workspaces',
});

function mapStateToProps(state, props) {
  return {
    form: requestForm(state, props),
    response: requestResponse(state, props),
    workspace: currentWorkspace(state, props),
    proxy: settingsProxy(state, props),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default compose(
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
  autorize({
    redirect: '/sign-in',
    rules: [isAuthenticated],
  })
)(WorkspaceComponent);
