import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Input, Card, Row, Col, Button } from 'antd';
import './index.css';
import Root from './Root';

import features from './modules';
import * as serviceWorker from './serviceWorker';
import { firebase, redux, i18n, fela, createServices } from './config';

const { TextArea } = Input;

async function bootstrap(firebaseConfig) {
  const app = firebase(firebaseConfig);
  const renderer = fela();
  const services = await createServices(features);
  const epic = combineEpics.apply(null, features.epics);
  const { store, persistor } = redux(
    combineReducers(features.reducer),
    epic,
    app,
    { services }
  );

  return { services, epic, store, persistor, renderer, app };
}

const Initial = () => {
  const [bootstrapInfo, setBootstrap] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    window.ipcRenderer.send('onFetchConfig', 'ping');
    window.ipcRenderer.on('setConfig', async (event, data) => {
      console.log(data);
      if (data.type !== 'error') {
        const bootData = await bootstrap(data.data);
        setBootstrap(bootData);
      }
    });
  }, []);

  return !bootstrapInfo ? (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Card
          title={
            'Enter Firebase Token Object using JSON as shown in the example below'
          }>
          <img
            alt="json example"
            src="json-config-example.png"
            style={{ width: '70%', padding: '20px' }}
          />
          <TextArea
            rows={10}
            placeholder="json firebase token object"
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
          />
          <Button
            type="primary"
            onClick={async () => {
              window.ipcRenderer.send('writeTokenToFS', JSON.parse(token));
              window.ipcRenderer.on('tokenWriteResult', async (event, data) => {
                if (data.type !== 'error') {
                  const bootData = await bootstrap(JSON.parse(token));
                  setBootstrap(bootData);
                }
              });
            }}>
            Send Firestore Token Object
          </Button>
        </Card>
      </Col>
      <Col span={4}></Col>
    </Row>
  ) : (
    <Root
      i18n={i18n}
      store={bootstrapInfo.store}
      firebase={bootstrapInfo.app}
      renderer={bootstrapInfo.renderer}
      services={bootstrapInfo.services}
      persistor={bootstrapInfo.persistor}
      routes={features.routes}
    />
  );
};

// bootstrap().then(({ services, store, persistor, renderer }) => {
ReactDOM.render(<Initial />, document.getElementById('root'));
serviceWorker.unregister();
// });
