// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { vehicleApi } from './services/vehicleApi';
import { combineReducers } from 'redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist'; 
import { driverApi } from './services/driverApi';
import { paymentApi } from './services/paymentApi';
import { rentalApi } from './services/rentalApi';
import { expenseApi } from './services/ExpenseApi';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [], // optionnel : ajoute des slices si besoin
};

const rootReducer = combineReducers({
  [vehicleApi.reducerPath]: vehicleApi.reducer,
  [driverApi.reducerPath]: driverApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [rentalApi.reducerPath]: rentalApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    .concat(vehicleApi.middleware)
    .concat(driverApi.middleware)
    .concat(expenseApi.middleware)
    .concat(rentalApi.middleware)
    .concat(paymentApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
