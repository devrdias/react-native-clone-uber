import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

// define Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Nao utilizar AsyncStorage para armazenar informacoes sensiveis, privadas
 *
 * TODO: implementar redux-persist-sensitive-storage
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */

const persistConfig = {
  transforms: [
    /**
     * Necessario para utilizar immutable reducers
     * @see https://github.com/rt2zz/redux-persist-transform-immutable
     */
    immutableTransform(),
  ],
  key: 'root',
  storage,
  /**
   * Blacklist state - definir  o que nao deve ser salvo na AsyncStorage
   */
  blacklist: [
    // 'exchange', // informar o nome do reducer da store
  ],
};

export default function configureStore(rootReducer, rootSaga) {
  // define middlewares a serem usados
  const middleware = [logger];

  // definie enhancers a serem usados
  const enhancers = [];

  // Conectar sagas a redux store
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // enhancers.push(composeEnhancers(applyMiddleware(...middleware)));

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)));
  const persistor = persistStore(store);

  // Inicia redux sagas watchers
  sagaMiddleware.run(rootSaga);
  // .done.catch((e) => {
  //   console.log('SAGA' , e.message)
  // });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return { store, persistor };
}
