/* eslint-disable */
/* prettier-ignore */
import React, { useMemo } from "react";
import { Card, Menu, Dropdown, Icon } from "antd";
import { useTranslation } from "react-i18next";

const { Meta } = Card;

function ProjectCardTitle({ workspace, onEdit, onRemove }) {
    const { t } = useTranslation();
    const trigger = (fn, ...params) => ({ domEvent }) => {
        domEvent.stopPropagation();
        return fn(...params);
    };

    const menu = workspace => {
        return (
            <Menu>
                <Menu.Item onClick={trigger(onEdit, workspace)}>{t('button.edit')}</Menu.Item>
                <Menu.Item onClick={trigger(onRemove, workspace)}>{t('button.remove')}</Menu.Item>
            </Menu>
        )
  };


  const extra = workspace => (
    <Dropdown overlay={menu(workspace)}>
      <Icon type="ellipsis" />
    </Dropdown>
  );

  return (
    <div className="d-flex flex-direction-row">
      <div className="flex-grow-1">{workspace.name}</div>
      <div className="flex-grow-0">{extra(workspace)}</div>
    </div>
  );
}

export function ProjectCard({ workspace, onEdit, onRemove, onOpen }) {
  const open = () => onOpen(workspace);
  const title = useMemo(() => <ProjectCardTitle onEdit={onEdit} onRemove={onRemove} workspace={workspace} />, [ workspace ]);

  return (
    <Card hoverable onClick={open} title={title}>
      <Meta style={{ height: '100px' }} description={workspace.description} />
    </Card>
  );
}
