/* eslint-disable */
/* prettier-ignore */
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const SignIn = lazy(() => import('./containers/SignIn'));
const SignUp = lazy(() => import('./containers/SignUp'));
const ResetPass = lazy(() => import('./containers/ResetPass'));

export const routes = [
  <Route path="/sign-in" component={SignIn} />,
  <Route path="/sign-up" component={SignUp} />,
  <Route path="/reset" component={ResetPass} />,
];
