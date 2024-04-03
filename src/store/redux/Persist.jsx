import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/AdminSlice";
import doctorReducer from "./slices/DoctorSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer);
const persistDoctorReducer = persistReducer(persistConfig, doctorReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    admin: persistedAdminReducer,
    doctor: persistDoctorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
