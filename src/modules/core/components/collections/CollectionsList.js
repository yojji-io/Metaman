/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import React from 'react';
import { List, Collapse, Dropdown, Icon, Menu } from 'antd';

import { CollectionCard } from './CollectionCard';
import { useTranslation } from "react-i18next";

const { Item } = List;
const { Panel } = Collapse;

export function CollectionsListComponent({ collections = [], onEdit, onRemove, onAddFolder, onExport, renderFolders, renderRequests }) {
    const { t } = useTranslation();

    const trigger = (fn, ...params) => ({ domEvent }) => {
    domEvent.stopPropagation();
    return fn(...params);
  };

  const menu = (collection) => (
    <Menu>
      <Menu.Item onClick={trigger(onEdit, collection)}>{t('button.edit')}</Menu.Item>
      <Menu.Item onClick={trigger(onExport, collection)}>{t('button.export')}</Menu.Item>
      <Menu.Item onClick={trigger(onAddFolder, collection)}>{t('button.add_folder')}</Menu.Item>
      <Menu.Item onClick={trigger(onRemove, collection)}>{t('button.remove')}</Menu.Item>
    </Menu>
  );

  const extra = (collection) => (
    <Dropdown overlay={menu(collection)}>
      <Icon type="ellipsis" />
    </Dropdown>
  );

  return (
    <Collapse bordered={false}>
      {_.map(collections, (collection, key) => (
        <Panel extra={extra(collection)} key={key} header={collection.name}>
          <CollectionCard 
            onEdit={onEdit} 
            onRemove={onRemove} 
            collection={collection} 
            renderFolders={renderFolders}
            renderRequests={renderRequests}
          />
        </Panel>
      ))}
    </Collapse>
  );
}
