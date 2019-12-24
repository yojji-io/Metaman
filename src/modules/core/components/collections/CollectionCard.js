/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { Card, Popconfirm } from 'antd';

export function CollectionCard({ collection = {}, onEdit, onRemove, renderFolders, renderRequests }) {

  const edit = () => onEdit(collection);
  const remove = () => onRemove(collection);

  return (
    <>
      {renderFolders(collection)}
      {renderRequests(collection)}
    </>
  );
}
