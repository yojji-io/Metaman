/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { List } from 'antd';
import { RequestCard } from './RequestCard';

const { Item } = List;


export function RequestsList({ requests, onEdit, onSelect, onRemove }) {
  return (
    <List 
      split
      bordered={false}
      itemLayout="vertical"
      dataSource={requests}
      renderItem={request => (
        <Item>
          <RequestCard
            onEdit={onEdit} 
            request={request} 
            onSelect={onSelect}
            onRemove={onRemove} 
          />
        </Item>
      )}
    />
  );
}
