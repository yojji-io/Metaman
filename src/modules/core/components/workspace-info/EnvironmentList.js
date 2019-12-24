import { Icon, List } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ onAddEnvironment }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-between">
      <span>{t('sidebar.environments')}: </span>
      <div>
        <Icon
          onClick={onAddEnvironment}
          className="cursor-pointer"
          type="plus"
        />
      </div>
    </div>
  );
};

export const EnvironmentList = ({
  envs = {},
  loading,
  onAddEnvironment,
  onEditEnvironment,
}) => {
  return (
    <List
      loading={loading}
      size="small"
      header={<Header onAddEnvironment={onAddEnvironment} />}
      dataSource={Object.entries(envs)}
      renderItem={([key, value], i) => (
        <List.Item key={i} className="d-flex align-items-center">
          <div className="d-flex justify-content-between w-100">
            <span>{key} </span>
            <div>
              <Icon
                onClick={() =>
                  onEditEnvironment({
                    name: key,
                    params: Object.entries(value).reduce(
                      (acc, [name, value]) => {
                        return [...acc, { name, value, active: true }];
                      },
                      []
                    ),
                  })
                }
                className="cursor-pointer"
                type="edit"
              />
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};
