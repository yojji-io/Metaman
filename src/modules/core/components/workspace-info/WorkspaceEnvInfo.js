import { Table } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';

export const WorkspaceEnvInfo = ({ envVars }) => {
  const { t } = useTranslation();
  const showEmptyState = isEmpty(envVars);
  // todo fix styles

  const data = useMemo(
    () => Object.entries(envVars).map(([key, value]) => ({ key, value })),
    [envVars]
  );

  const columns = [
    {
      title: t('workspace.variable'),
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: t('workspace.value'),
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return showEmptyState ? (
    <div className="d-flex align-items-center flex-column p-2">
      <h3>No active Environment</h3>
      <p>
        An environment is a set of variables that allow you to switch the
        context of your requests.
      </p>
    </div>
  ) : (
    <Table
      rowKey="uid"
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
    />
  );
};
