import { compose } from 'redux';
import { Button, Form, Input, message } from 'antd';
import LoadingWrapper from '../../../common/components/loadingWrapper';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const { Item } = Form;

const WorkspaceModal = ({ form, onSubmit, close }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const submit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      setLoading(true);
      onSubmit(values)
        .then(() => {
          message.success(
            `${values.email} ${t('workspace.messages.user_added_to_contributors')}`
          );
          close();
        })
        .catch(err => {
          message.error(err.message);
        })
        .finally(() => setLoading(false));
    });
  };

  return (
    <LoadingWrapper loading={loading}>
      <Form onSubmit={submit}>
        <Item label={t('auth.email')}>
          {form.getFieldDecorator('email', {
            rules: [
              { required: true, message: t('field.is_required') },
              { type: 'email', message: t('field.email') },
            ],
          })(<Input />)}
        </Item>
        <div>
          <Button type="primary" htmlType="submit">
            {t('button.submit')}
          </Button>
        </div>
      </Form>
    </LoadingWrapper>
  );
};

export const WorkspaceModalForm = compose(Form.create())(WorkspaceModal);
