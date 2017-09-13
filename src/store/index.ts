import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer, RootState } from './reducers/root';

function configureStore() {
  // create store
  return createStore<RootState>(
    rootReducer
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
