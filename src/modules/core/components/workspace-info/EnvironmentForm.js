import { compose } from 'redux';
import { Button, Form, Input, message, Empty } from 'antd';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicParams } from '../request/DynamicParams';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import LoadingWrapper from '../../../common/components/loadingWrapper';
import { isPresentEmptyParameter } from '../request/DynamicParams';

const { Item } = Form;
export const EnvironmentFormComponent = ({
  form,
  data,
  onSubmit,
  size,
  close,
}) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const initialName = useMemo(() => data.name || '', [data.name]);

  const submit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      setLoading(true);
      onSubmit(values, initialName)
        .then(msg => {
          message.success(msg);
          close();
        })
        .catch(err => message.error(err.message))
        .finally(() => setLoading(false));
    });
  };

  const { name, params } = form.getFieldsValue(['name', 'params']);

  const isDisabled =
    isEmpty(name) ||
    isEmpty(params) ||
    name.trim() === '' ||
    isPresentEmptyParameter(params);

  return (
    <LoadingWrapper loading={loading}>
      <Form onSubmit={submit}>
        {/*todo add validation for uniq name*/}
        <Item label={t('general.name')}>
          {form.getFieldDecorator('name', {
            initialValue: initialName,
          })(<Input size={size} />)}
        </Item>
        {form.getFieldDecorator('params', {
          initialValue: get(data, 'params', []),
        })(
          <DynamicParams
            size={size}
            description={t('general.no_data')}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
        <Button disabled={isDisabled} type="primary" htmlType="submit">
          {t('button.submit')}
        </Button>
      </Form>
    </LoadingWrapper>
  );
};

export const EnvironmentForm = compose(Form.create())(EnvironmentFormComponent);
