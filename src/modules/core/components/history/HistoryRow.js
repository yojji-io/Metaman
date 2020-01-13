/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import { Tag, Popconfirm, Button } from 'antd';
import { resolve } from 'url';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function HistoryRow({ record, onRestore, onRemove, index }) {
  const { t } = useTranslation();
  const restore = () => onRestore(record.request, record.response);
  const removeItemFromHistory = e => {
    onRemove([index]);
  };
  const request = useMemo(() => record.request, [record]);
  const response = useMemo(() => record.response || record.error, [record]);
  return (
    <div
      className="px-3 py-2 cursor-pointer"
      onClick={restore}
      style={{ position: 'relative' }}>
      <Tag>{_.get(response, 'status') || 404}</Tag>
      <span>{resolve(request.baseURL || '', request.url || '')}</span>
      <div style={{ position: 'absolute', top: '-1rem', right: '-0.7rem' }}>
        <Popconfirm
          title={t('general.are_you_sure')}
          onConfirm={removeItemFromHistory}
          okButtonProps={{ type: 'danger' }}
          cancelText={t('button.cancel')}>
          <Button type="link">x</Button>
        </Popconfirm>
      </div>
    </div>
  );
}
