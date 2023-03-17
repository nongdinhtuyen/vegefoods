import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './root_reducers';
import rootSaga from './root_saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  devTools: true,
  middleware: (getDefaultMiddleware: any) => [
    ...getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: ignoredActions,
      // },
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

store.dispatch({
  type: 'INIT',
});

export default store;
