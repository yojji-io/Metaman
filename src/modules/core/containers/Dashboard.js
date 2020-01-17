import _ from 'lodash';
import { compose } from 'redux';
import { useFela } from 'react-fela';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal, message, List, Layout } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';

import * as paths from '../firebase-path';
import { withFirestore } from '../../common/utils';
import { autorize } from '../../common/hocs/autorize';
import { workspacesList } from '../selectors/workspaces';
import { isAuthenticated } from '../../common/utils/autorization';

import { Header } from './Header';
import { ProjectCard } from '../components/ProjectCard';
import { WorkspaceForm } from '../components/WorkspaceForm';
import { WorkspaceFilter } from '../components/dashboard/WorkspaceFilter';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../common/hooks';

const { Content } = Layout;
const grid = { xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3, gutter: 16 };

const style = {
  layout: {
    minHeight: '100vh',
  },
  content: {
    background: '#f9f9f9',
  },
};

function DashboardComponent({ firestore, workspaces, ...props }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const history = useHistory();
  const { css } = useFela(props);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState('');

  const dataSource = useMemo(
    () =>
      _.filter(workspaces, ws =>
        ws.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [workspaces, filter]
  );

  useEffect(() => {
    firestore.setListener(DashboardComponent.firedata(user.email));

    return function cleanup() {
      firestore.unsetListener(DashboardComponent.firedata(user.email));
    };
    // eslint-disable-next-line
  }, [firestore]);

  const handle = data => {
    if (data.id) {
      firestore
        .set(paths.workspaces.one({ workspace: data.id }), data)
        .then(() => setModal(false))
        .catch(err => message.error(err.message));
    } else {
      delete data.id; // Workaround for Firestore saving
      data.contributors = [user.email];
      data.superAdmin = user.email;
      firestore
        .add(paths.workspaces.all(), data)
        .then(() => setModal(false))
        .catch(err => message.error(err.message));
    }
  };

  const close = () => setModal(false);
  const open = input => () => setModal(input);
  const project = workspace => history.push(`/workspace/${workspace.id}`);
  const remove = async doc => {
    try {
      await firestore
        .collection(paths.workspaces.all())
        .doc(doc.id)
        .delete();
      message.success('Workspace has been removed');
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Layout className={css(style.layout)}>
        <Header
          // eslint-disable-next-line no-undef
          title={`${t('header.dashboard')} ${process.env.REACT_APP_VERSION}`}
        />
        <Content className={css(style.content)}>
          <div className="container">
            <WorkspaceFilter
              onFilter={setFilter}
              size="large"
              className="my-3"
              onNew={open({})}
            />
            <List
              grid={grid}
              itemLayout="horizontal"
              dataSource={dataSource}
              renderItem={item => (
                <List.Item>
                  <ProjectCard
                    onOpen={project}
                    onRemove={remove}
                    onEdit={open(item)}
                    workspace={item}
                  />
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>

      <Modal footer={false} destroyOnClose onCancel={close} visible={modal}>
        <WorkspaceForm workspace={modal} onSubmit={handle} />
      </Modal>
    </>
  );
}

DashboardComponent.firedata = userEmail => ({
  limit: 10,
  collection: paths.workspaces.all(),
  where: ['contributors', 'array-contains', userEmail],
});

function mapStateToProps(state, props) {
  return {
    workspaces: workspacesList(state, props),
  };
}

export default compose(
  withFirestore,
  connect(mapStateToProps),
  autorize({
    redirect: '/sign-in',
    rules: [isAuthenticated],
  })
)(DashboardComponent);
