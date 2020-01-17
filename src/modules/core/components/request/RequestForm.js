import _ from 'lodash';
import { compose } from 'redux';
import React, { useEffect, useMemo, forwardRef } from 'react';
import { Form, Tabs, Button, Row, Col, Card } from 'antd';

import { MainForm } from './MainForm';
import { DynamicParams } from './DynamicParams';
import { Auth } from './Auth';
import { hasRequestBody } from '../../../common/utils/hasRequestBody';
import { ProxySelect } from '../request-view/ProxySelect';
import { useTranslation } from 'react-i18next';

const { Group } = Button;
const { TabPane } = Tabs;

const DynamicParamsWithRef = forwardRef((props, ref) => (
  <DynamicParams innerRef={ref} {...props} />
));
DynamicParamsWithRef.displayName = 'DynamicParamsWithRef';

const AuthWithRef = forwardRef((props, ref) => (
  <Auth innerRef={ref} {...props} />
));
AuthWithRef.displayName = 'AuthWithRef';

export function RequestFormComponent({
  size = 'large',
  form,
  request = {},
  onExecute,
  onSave,
  onSaveAs,
  onClear,
  renderResponse,
  onProxyChange,
  proxy,
  env,
  setEnv,
}) {
  const values = form.getFieldsValue();
  const { t } = useTranslation();
  const { method } = values;

  useEffect(() => {
    form.resetFields();
  }, [request, form]);

  const isBodyAvailable = useMemo(
    () => hasRequestBody(method) || hasRequestBody(request.method),
    [method, request.method]
  );

  const save = () => onSave(values);
  const process = () => onExecute(values);
  const clear = () => {
    onClear(values);
    form.resetFields();
  };
  const onExecuteFromEnterKey = e => {
    if (e.which === 13) {
      onExecute(values);
    }
  };
  return (
    <Form
      style={{ minHeight: '100%' }}
      className="d-flex flex-column"
      onKeyUp={onExecuteFromEnterKey}>
      <div className="flex-grow-0">
        <div className="d-flex">
          <ProxySelect onChange={onProxyChange} proxy={proxy} />
          <Group size={size} className="ml-auto">
            <Button type="default" onClick={save} icon="save">
              {t('button.save')}
            </Button>
            <Button type="default" onClick={onSaveAs} icon="save">
              {t('button.save_as')}
            </Button>
            <Button type="primary" onClick={process} icon="fire">
              {t('button.execute')}
            </Button>
            <Button type="danger" onClick={clear} icon="close">
              {t('button.clear')}
            </Button>
          </Group>
        </div>

        <MainForm
          size={size}
          request={request}
          form={form}
          env={env}
          setEnv={setEnv}
        />
      </div>

      <Row
        className="flex-grow-1"
        style={{ minHeight: '100%', display: 'flex' }}
        gutter={16}>
        <Col style={{ minHeight: '100%' }} span={8}>
          <Card
            style={{ minHeight: '100%' }}
            bodyStyle={{ padding: 0, minHeight: '100%' }}>
            <Tabs className="no-margin" defaultActiveKey="headers">
              <TabPane
                style={{ padding: '0 15px' }}
                key="auth"
                tab={t('form.auth')}>
                {form.getFieldDecorator('auth', {
                  initialValue: _.get(request, 'auth', {}),
                })(<AuthWithRef size={size} />)}
              </TabPane>
              <TabPane
                style={{ padding: '0 15px' }}
                key="headers"
                tab={t('form.headers')}>
                {form.getFieldDecorator('headers', {
                  initialValue: _.get(request, 'headers', []),
                })(<DynamicParamsWithRef size={size} />)}
              </TabPane>
              <TabPane
                key="parameters"
                tab={t('form.parameters')}
                style={{ padding: '0 15px' }}>
                {form.getFieldDecorator('params', {
                  initialValue: _.get(request, 'params', []),
                })(<DynamicParamsWithRef size={size} />)}
              </TabPane>
              <TabPane
                style={{ padding: '0 15px' }}
                key="body"
                disabled={!isBodyAvailable}
                tab={t('form.body')}>
                {form.getFieldDecorator('data', {
                  initialValue: _.get(request, 'data', []),
                })(<DynamicParamsWithRef size={size} />)}
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span={16}>
          <Card
            style={{ minHeight: '100%', display: 'flex', flexGrow: 1 }}
            bodyStyle={{
              display: 'flex',
              padding: 0,
              minHeight: '100%',
              flexGrow: 1,
              alignContent: 'stretch',
              justifyContent: 'center',
            }}>
            {renderResponse()}
          </Card>
        </Col>
      </Row>
    </Form>
  );
}

export const RequestForm = compose(
  Form.create({
    onValuesChange: (props, updates, values) => props.onChange(values),
  })
)(RequestFormComponent);
