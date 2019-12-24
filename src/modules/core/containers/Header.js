/* eslint-disable */
/* prettier-ignore */
import React from 'react';

import { useAuth } from '../../common/hooks';
import { HeaderComponent } from '../components/Header';

export function Header({ title }) {
  const { user, signout } = useAuth();

  return <HeaderComponent onLogout={signout} user={user} title={title} />
}
