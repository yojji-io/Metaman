/* eslint-disable */
/* prettier-ignore */
import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Divider, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { OAuth } from './OAuth';

const { Item } = Form;

export function SignInComponent({ form, onSubmit, size, onOauth, getRecaptchaVerifier }) {
  const toManyAttemptsTimePenalty = 60000;
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unableTimeoutId, setUnableTimeoutId] = useState();

  useEffect(() => () => clearTimeout(unableTimeoutId), [] );

  const unableButton = () => setDisabled(false) && setUnableTimeoutId();

  const handleToManyLoginAttempts = () => {
      setDisabled(true);
      const timeoutUd = setTimeout(unableButton, toManyAttemptsTimePenalty);
      setUnableTimeoutId(timeoutUd);
  };

  const submit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      setLoading(true);
      onSubmit(values)
          .catch((err) => {
              if (typeof err.code === "string") {
                  err.code === 'auth/too-many-requests' && handleToManyLoginAttempts();
                  message.error(t('auth.errors.' + err.code));
                  return
              }
              message.error(err.message)
          })
          .finally(() => setLoading(false))
    });
  };

  return (
    <Form onSubmit={submit}>
      <OAuth size={size} onOauth={onOauth} />
      <Divider>{t('general.or')}</Divider>
      
      <Item label={t('auth.email')}>
        {form.getFieldDecorator(
            'email',
            { rules:
                    [
                        { required: true, message: t('field.is_required') },
                        { type: 'email', message: t('field.email') }
                    ]
            })
          (<Input size={size} type="email" />)
        }
      </Item>
      <Item label={t('auth.password')}>
        {form.getFieldDecorator('password', { rules: [{ required: true, message: t('field.is_required') }] })
          (<Input size={size} type="password" />)}
      </Item>
      <Item>
        <Button
            loading={loading}
            className="mb-1"
            block size={size}
            htmlType="submit"
            disabled={disabled}
            type="primary"
        >
            {t('button.submit')}
        </Button>
        <div className="text-right">
          <Link className="mr-2" to="/reset">
            {t('button.reset')}
          </Link>
          <Link to="/sign-up">
            {t('button.to-signup')}
          </Link>
        </div>
      </Item>
    </Form>
  );
}

export const SignInForm = compose(
  Form.create(),
)(SignInComponent);
