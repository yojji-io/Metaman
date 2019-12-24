/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { Card, Popconfirm } from 'antd';

export function FolderCard({ folder = {}, onEdit, onRemove, renderRequests }) {

  const edit = () => onEdit(folder);
  const remove = () => onRemove(folder);
  
  // [
  //   <span key="on-edit" onClick={edit}>Edit</span>,
  //   <Popconfirm okButtonProps={{ type: 'danger' }} title="Are you sure?" key="on-remove" onConfirm={remove}>
  //     <span>Remove</span>
  //   </Popconfirm>
  // ]

  return (
    <div>
        {renderRequests(folder)}
    </div>
  );
}
