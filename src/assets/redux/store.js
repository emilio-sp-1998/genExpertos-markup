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

const persistConfig = {
  key: "root", // clave principal para el almacenamiento local
  storage: storage, // el motor de almacenamiento, puedes cambiarlo según tus necesidades
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };