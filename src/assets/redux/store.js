import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/reducer";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import env from "../../../config/env.json"

const config = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(config, reducer);

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') localStorage.clear()
    console.log(action)
    return persistedReducer(state, action)
}

export default () => {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        env.NODE_ENV === 'development' ? getDefaultMiddleware({
          serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}
        }).concat(promise, thunk, logger) : getDefaultMiddleware({
          serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}
        }).concat(promise, thunk),
      devTools: env.NODE_ENV === 'development',  
    })
    const persistor = persistStore(store)
    return { persistor, store }
}