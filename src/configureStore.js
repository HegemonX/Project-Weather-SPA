import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
import logger from "redux-logger";
import myApp from "./reducers";
import { saveState, loadState } from "./localStorage";
import throttle from "lodash/throttle";

const thunk = store => next => action =>
  typeof action === "function"
    ? action(store.dispatch, store.getState)
    : next(action);

const configureStore = () => {
  const persistedState = loadState();
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
    console.log("STATE LOADED");
    console.dir(persistedState);
  }
  const composeEnc = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    myApp,
    persistedState,
    composeEnc(applyMiddleware(...middlewares))
  );
  store.subscribe(
    throttle(() => {
      saveState({
        ...store.getState()
      });
    }),
    10000
  );
  return store;
};
export default configureStore;
