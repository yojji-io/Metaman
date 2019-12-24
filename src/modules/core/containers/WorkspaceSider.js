import React from 'react';
import { Tabs } from 'antd';

import { History } from './History';
import { Collections } from './Collections';
import { useTranslation } from 'react-i18next';
import { WorkspaceInfo } from './WorkspaceInfo';

const { TabPane } = Tabs;

export function WorkspaceSider({ workspace, ...props }) {
  const { t } = useTranslation();
  return (
    <Tabs className="workspace-sider no-margin" defaultActiveKey="history">
      <TabPane key="history" tab={t('sidebar.history')}>
        <History workspace={workspace} />
      </TabPane>
      <TabPane key="collections" tab={t('sidebar.collections')}>
        <Collections {...props} workspace={workspace} />
      </TabPane>
      <TabPane key="workspace" tab={t('sidebar.workspace')}>
        <WorkspaceInfo workspace={workspace} />
      </TabPane>
    </Tabs>
  );
}
