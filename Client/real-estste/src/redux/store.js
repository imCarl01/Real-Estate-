import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./user/userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: useReducer,
});

const persistCongfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistCongfig, rootReducer);

export const store = configureStore({
  //   reducer: {
  //     user: useReducer
  //   },
  reducer: persistedReducer,
  middleware: (getDefualtMiddleware) =>
    getDefualtMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
