/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { Tag, Icon } from 'antd';

export function RequestCard({ request, onSelect, onRemove, onEdit }) {
  const trigger = fn => (e) => {
    e.stopPropagation();
    fn(request);
  };
    const text = request.name || request.config.url;

  return (
    <div className="d-flex align-items-start flex-row cursor-pointer" size="small" onClick={trigger(onSelect)}>
      <Tag className="flex-grow-0">
        <span className="text-uppercase">
          {request.config.method}
        </span>
      </Tag>
      <span className="flex-grow-1 text-truncate" title={text}>
        {text}
      </span>
      <span className="flex-grow-0">
        <Icon onClick={trigger(onRemove)} type="delete" />
      </span>
    </div>
  );
}
