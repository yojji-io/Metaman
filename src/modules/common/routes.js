/* eslint-disable */
/* prettier-ignore */
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Home = lazy(() => import('./containers/Home'));

export const routes = [
  <Route path="/" exact component={Home} />,
];
