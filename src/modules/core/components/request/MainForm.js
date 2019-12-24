import _ from 'lodash';
import React from 'react';
import { Form, Input, Select, Col, Row } from 'antd';
import { CONTENT_TYPES, HTTP_METHOD } from '../../constants';
import { hasRequestBody } from '../../../common/utils/hasRequestBody';
import { useTranslation } from 'react-i18next';
import { Environment } from './Envirement';

const { Item } = Form;
const { Option } = Select;

export function MainForm({ form, request, size, env, setEnv }) {
  const { t } = useTranslation();
  const hasBody = hasRequestBody(request.method);
  return (
    <>
      <Row gutter={16} className="align-items-stretch">
        <Col md={3}>
          <Item label={t('form.method')}>
            {form.getFieldDecorator('method', {
              initialValue: request.method || HTTP_METHOD.GET,
            })(
              <Select size={size}>
                {_.map(HTTP_METHOD, (value, key) => (
                  <Option key={key} value={value}>
                    {key}
                  </Option>
                ))}
              </Select>
            )}
          </Item>
        </Col>
        <Col md={9}>
          <Item label={t('form.host')}>
            {form.getFieldDecorator('baseURL', {
              initialValue: request.baseURL,
            })(<Input size={size} />)}
          </Item>
        </Col>
        <Col md={8}>
          <Item label={t('form.path')}>
            {form.getFieldDecorator('url', {
              initialValue: request.url,
              required: true,
            })(<Input size={size} />)}
          </Item>
        </Col>
        <Environment
          form={form}
          size={size}
          request={request}
          env={env}
          setEnv={setEnv}
        />
      </Row>
      {hasBody && (
        <Row>
          <Col>
            <Item label="Content Type">
              {form.getFieldDecorator('content', {
                initialValue:
                  request.content || CONTENT_TYPES['application/json'],
              })(
                <Select size={size}>
                  {_.map(CONTENT_TYPES, (value, key) => (
                    <Option value={value} key={key}>
                      {value}
                    </Option>
                  ))}
                </Select>
              )}
            </Item>
          </Col>
        </Row>
      )}
    </>
  );
}
