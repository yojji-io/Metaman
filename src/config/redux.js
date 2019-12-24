/* eslint-disable */
/* prettier-ignore */
import { reduxFirestore } from 'redux-firestore';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, compose, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import get from 'lodash/get';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const redux = (rootReducer, rootEpic, firebase, { services }) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: services,
  });
  
  const persistConfig = {
    version: 0,
    key: 'root',
    storage,
    migrate: state => {
      const currentVersion = get(state, ['_persist', 'version']);
      const migratedState = persistConfig.version === currentVersion ? state : {};
      return Promise.resolve(migratedState);
    }
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    composeEnhancers(
      reduxFirestore(firebase, {}),
      applyMiddleware(epicMiddleware),
    ), 
  );
    
  epicMiddleware.run(rootEpic);
  let persistor = persistStore(store);

  return { store, persistor };
};
