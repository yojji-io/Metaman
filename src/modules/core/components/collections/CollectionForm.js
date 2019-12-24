/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { compose } from 'redux';
import { Form, Button, Input } from 'antd';
import { useTranslation } from "react-i18next";

const { Item } = Form;

export function CollectionFormComponent({ form, onSubmit, collection = {} }) {
    const { t } = useTranslation();

    const submit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      onSubmit(values);
    });
  };

  form.getFieldDecorator('id', { initialValue: collection.id });

  return (
    <Form onSubmit={submit}>
      <Item label={t('general.name')}>
        {form.getFieldDecorator('name', { initialValue: collection.name, rules: [{ required: true }] })(
          <Input />
        )}
      </Item>
      <div>
        <Button type="primary" htmlType="submit">{t('button.save')}</Button>
      </div>
    </Form>
  );
}

export const CollectionForm = compose(
  Form.create(),
)(CollectionFormComponent);
