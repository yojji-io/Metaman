import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { firebaseConfig } from './config/firebase-client.config';

import './index.css';
import Root from './Root';

import features from './modules';
import * as serviceWorker from './serviceWorker';
import { firebase, redux, i18n, fela, createServices } from './config';

const app = firebase(firebaseConfig);

async function bootstrap() {
  const renderer = fela();
  const services = await createServices(features);
  const epic = combineEpics.apply(null, features.epics);
  const { store, persistor } = redux(
    combineReducers(features.reducer),
    epic,
    app,
    { services }
  );

  return { services, epic, store, persistor, renderer };
}

bootstrap().then(({ services, store, persistor, renderer }) => {
  ReactDOM.render(
    <Root
      i18n={i18n}
      store={store}
      firebase={app}
      renderer={renderer}
      services={services}
      persistor={persistor}
      routes={features.routes}
    />,
    document.getElementById('root')
  );
  serviceWorker.unregister();
});
