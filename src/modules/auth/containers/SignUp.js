/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { compose } from 'redux';

import { useAuth } from '../../common/hooks';
import { autorize } from '../../common/hocs';
import { SignUpForm } from '../components/SignUp';
import { isGuest } from '../../common/utils/autorization';
import { EmptyPage } from '../../common/containers/EmptyPage';
import { Card } from 'antd';
import { CenteredCard } from '../components/CenteredCard';
import {useTranslation} from "react-i18next";

export function SignUpComponent() {
  const { t } = useTranslation();
  const { signup } = useAuth();

  const onSignUp = ({ email, password }) => signup(email, password);

  return (
    <EmptyPage>
      <CenteredCard width={400}>
        <Card title={t('auth.title.sign_up')}>
          <SignUpForm size="large" onSubmit={onSignUp} />
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
)(SignUpComponent);
