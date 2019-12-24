/* eslint-disable */
/* prettier-ignore */
import {useAuth} from "../../common/hooks";
import {EmptyPage} from "../../common/containers/EmptyPage";
import {CenteredCard} from "../components/CenteredCard";
import {Card} from "antd";
import {compose} from "redux";
import {autorize} from "../../common/hocs";
import {isGuest} from "../../common/utils/autorization";
import React from "react";
import {ResetPassForm} from "../components/ResetPass";
import {useTranslation} from "react-i18next";

export function SignInComponent() {
    const { t } = useTranslation();
    const { sendPasswordResetEmail } = useAuth();

    const onResetPass = ({ email }) => sendPasswordResetEmail(email);

    return (
        <EmptyPage>
            <CenteredCard width={320}>
                <Card title={t('auth.title.reset')}>
                    <ResetPassForm  size="large" onSubmit={onResetPass} />
                </Card>
            </CenteredCard>
        </EmptyPage>
    );
}

export default compose(
    autorize({
        rules: [isGuest],
        redirect: '/dashboard',
    })
)(SignInComponent);
