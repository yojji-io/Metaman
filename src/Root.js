/* eslint-disable */
/* prettier-ignore */
import React, { Suspense } from "react";
import { RendererProvider } from "react-fela";
import { I18nextProvider } from "react-i18next";
import { HashRouter, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import { ServicesContext } from "./modules/common/context";
import { ProvideAuth } from "./modules/common/containers/ProvideAuth";

function Root({ i18, store, routes, firebase, persistor, services, renderer }) {
  return (
    <I18nextProvider i18n={i18}>
      <RendererProvider renderer={renderer}>
        <ServicesContext.Provider value={services}>
          <PersistGate loading={null} persistor={persistor}>
            <ReduxProvider store={store}>
              <ReactReduxFirebaseProvider
                config={{}}
                dispatch={store.dispatch}
                firebase={firebase}
              >
                <ProvideAuth>
                  <HashRouter>
                    <Switch>
                      <Suspense fallback="loading...">
                        {routes.map((route, key) =>
                          React.cloneElement(route, { key })
                        )}
                      </Suspense>
                    </Switch>
                  </HashRouter>
                </ProvideAuth>
              </ReactReduxFirebaseProvider>
            </ReduxProvider>
          </PersistGate>
        </ServicesContext.Provider>
      </RendererProvider>
    </I18nextProvider>
  );
}

export default Root;
