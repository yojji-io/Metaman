/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { Input, Button, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const { Search } = Input;

export function WorkspaceFilter({
  onFilter,
  onNew,
  size,
  className = '',
  ...props
}) {
  const { t } = useTranslation();
  return (
    <Row
      gutter={16}
      {...props}
      className={`d-flex flex-direction-row ${className}`}>
      <Col className="flex-grow-1">
        <Search
          placeholder={t('workspace.search')}
          onChange={e => onFilter(e.target.value)}
          onSearch={onFilter}
          size={size}
        />
      </Col>
      <Col className="flex-grow-0">
        <Button onClick={onNew} size={size} type="primary" icon="plus">
          {t('workspace.add')}
        </Button>
      </Col>
    </Row>
  );
}
