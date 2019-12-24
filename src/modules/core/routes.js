/* eslint-disable */
/* prettier-ignore */
import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const Workspace = lazy(() => import('./containers/Workspace'));
const Dashboard = lazy(() => import('./containers/Dashboard'));

export const routes = [
  <Route path="/dashboard" component={Dashboard} />,
  <Route path="/workspace/:id" component={Workspace} />,
];
