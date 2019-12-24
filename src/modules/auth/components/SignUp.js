/* eslint-disable */
/* prettier-ignore */
import React, { useState } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import {Form, Input, Button, Divider, message} from 'antd';
import { useTranslation } from 'react-i18next';

const { Item } = Form;

export function SignUpComponent({ form, onSubmit, size }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      setLoading(true);
      onSubmit(values)
          .catch((err) => message.error(err.message))
          .finally(() => setLoading(false))
    });
  };

  return (
    <Form onSubmit={submit}>
      <Item label={t('auth.email')}>
        {form.getFieldDecorator(
            'email',
            { rules:
                    [
                        { required: true, message: t('field.is_required') },
                        { type: 'email', message: t('field.email') }
                    ],
            })
          (<Input size={size} type="email" />)}
      </Item>
      <Item label={t('auth.password')}>
        {form.getFieldDecorator('password', { rules: [{ required: true, message: t('field.is_required') }] })
          (<Input size={size} type="password" />)}
      </Item>
      <Item>
        <Button loading={ loading } className="mb-1" block size={size} htmlType="submit" type="primary">{t('button.submit')}</Button>
        <div className="text-right">
          <Link to="/sign-in">
            {t('button.to-signin')}
          </Link>
        </div>
      </Item>
    </Form>
  );
}

export const SignUpForm = compose(
  Form.create(),
)(SignUpComponent);
