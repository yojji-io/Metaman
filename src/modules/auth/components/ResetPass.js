/* eslint-disable */
/* prettier-ignore */
import { compose } from "redux";
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";

const { Item } = Form;

const ResetPass = ({form, onSubmit, size, history: { push }}) => {
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
                .then(() => {
                    message.success(t('auth.reset_success'));
                    push('/sign-in');
                })
                .catch((err) => message.error(err.message))
                .finally(() => setLoading(false))
        });
    };

    return <Form onSubmit={submit}>
        <Item label={t('auth.email')}>
            {form.getFieldDecorator('email',
                { rules: [
                    { required: true, message: t('field.is_required') },
                    { type: 'email', message: t('field.email') }
                    ]
                })
            (<Input size={size} type="email" />)}
        </Item>
        <Item className="mb-2">
            <Button
                loading={loading}
                className="mb-1"
                block size={size}
                htmlType="submit"
                type="primary"
            >
                {t('button.submit')}
            </Button>
        </Item>
        <div className="text-right">
            <Link to="/sign-in">
                {t('button.back')}
            </Link>
        </div>
    </Form>
};

export const ResetPassForm = compose(
    withRouter,
    Form.create(),
)(ResetPass);
