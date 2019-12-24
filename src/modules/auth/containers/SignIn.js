/* eslint-disable */
/* prettier-ignore */
import React from 'react';
import { compose } from 'redux';

import { useAuth } from '../../common/hooks';
import { autorize } from '../../common/hocs';
import { SignInForm } from '../components/SignIn';
import { isGuest } from '../../common/utils/autorization';
import { EmptyPage } from '../../common/containers/EmptyPage';
import { Card } from 'antd';
import { CenteredCard } from '../components/CenteredCard';
import {useTranslation} from "react-i18next";

export function SignInComponent() {
  const { t } = useTranslation();
  const { signin, oauth } = useAuth();

  const onSignIn = ({ email, password }) => signin(email, password);

  return (
    <EmptyPage>
      <CenteredCard width={400}>
        <Card title={t('auth.title.sign_in')}>
          <SignInForm onOauth={oauth} size="large" onSubmit={onSignIn} />
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

