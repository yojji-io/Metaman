import { Icon, List } from 'antd';
import React from 'react';
import {useTranslation} from "react-i18next";

const Header = ({ onAddContributor }) => {
    const { t } = useTranslation();

    return (
        <div className="d-flex justify-content-between">
            <span>{t('sidebar.contributors')}: </span>
            <div>
                <Icon
                    onClick={onAddContributor}
                    className="cursor-pointer"
                    type="user-add"
                />
            </div>
        </div>
    );
}

export const ContributorsLIst = ({
  contributors,
  onAddContributor,
  onRemoveContributor,
  loading,
}) => (
  <List
    loading={loading}
    size="small"
    header={<Header onAddContributor={onAddContributor} />}
    dataSource={contributors}
    renderItem={(item, i) => (
      <List.Item key={i} className="d-flex align-items-center">
        <span className="flex-grow-1">{item}</span>
        <Icon
          onClick={() => onRemoveContributor(item)}
          className="ml-auto cursor-pointer"
          type="delete"
        />
      </List.Item>
    )}
  />
);
