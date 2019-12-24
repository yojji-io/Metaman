import { Form, Select, Button, Col, Popover } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { currentWorkspace } from '../../selectors';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { WorkspaceEnvInfo } from '../workspace-info/WorkspaceEnvInfo';
import get from 'lodash/get';
import startCase from 'lodash/startCase';

const { Item } = Form;
const { Option } = Select;

const EnvironmentComponent = ({ form, env, setEnv, workspace, size }) => {
  const { t } = useTranslation();
  const noEnvOption = { name: t('workspace.no_env'), value: null };

  const envs = useMemo(() => {
    return workspace.envs
      ? [
          noEnvOption,
          ...Object.keys(workspace.envs).map(name => ({ name, value: name })),
        ]
      : [noEnvOption];
      // eslint-disable-next-line
  }, [workspace.envs]);

  const disableShowButton = useMemo(() => !env, [env]);
  const envVars = get(workspace, ['envs', env], {});

  return (
    <>
      <Col md={3}>
        <Item label={t('form.env')}>
          <Select size={size} value={env} onChange={setEnv}>
            {envs.map(({ name, value }, key) => (
              <Option key={key} value={value}>
                {name}
              </Option>
            ))}
          </Select>
        </Item>
      </Col>
      <Col md={1} className="d-flex pt-4">
        {/*todo fix button position*/}
        <Popover
          placement="bottomRight"
          title={startCase(env || noEnvOption.name)}
          content={<WorkspaceEnvInfo envVars={envVars} />}
          trigger="click"
          destroyTooltipOnHide
        >
          <Button
            disabled={disableShowButton}
            className="mt-3"
            type="primary"
            icon="eye"
            size={size}
          />
        </Popover>
      </Col>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  workspace: currentWorkspace(state, props),
});

export const Environment = compose(
  withRouter,
  connect(mapStateToProps, null)
)(EnvironmentComponent);
