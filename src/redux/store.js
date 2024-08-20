import {
  combineReducers,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import i18nReducer from "../features/i18n/i18nSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  users: userReducer,
  i18n: i18nReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
