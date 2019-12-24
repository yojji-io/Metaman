/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import React from 'react';
import { Button, List, Popconfirm } from 'antd';

import { HistoryRow } from './HistoryRow';
import { useTranslation } from 'react-i18next';

const { Item } = List;

export function HistoryList({ list, onRestore, onClear }) {
  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          textAlign: 'right',
          padding: '5px 15px',
          borderBottom: '1px solid #e7e7e7',
        }}>
        <Popconfirm
          title={t('general.are_you_sure')}
          onConfirm={onClear}
          okButtonProps={{ type: 'danger' }}
          cancelText={t('button.cancel')}>
          <Button type="link">{t('sidebar.delete_history')}</Button>
        </Popconfirm>
      </div>

      <List
        split
        bordered={false}
        dataSource={list}
        itemLayout="vertical"
        renderItem={record => (
          <Item>
            <HistoryRow record={record} onRestore={onRestore} />
          </Item>
        )}
      />
    </>
  );
}
