/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import { Tag } from 'antd';
import { resolve } from 'url';
import React, { useMemo } from 'react';

export function HistoryRow({ record, onRestore }) {
  const restore = () => onRestore(record.request, record.response);

  const request = useMemo(() => record.request, [record]);
  const response = useMemo(() => record.response || record.error, [record]);
  return (
    <div className="px-3 py-2 cursor-pointer" onClick={restore}>
      <Tag>{_.get(response, 'status') || 404}</Tag>
      <span>{resolve(request.baseURL || '', request.url || '')}</span>
    </div>
  );
}
