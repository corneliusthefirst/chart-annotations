
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import partOneSliceReducer from "./slices/partOneSlice"
import partTwoSliceReducer from "./slices/partTwoSlice"
import { arrayTransform } from '../utils/helpers'
import { useDispatch, useSelector } from 'react-redux'

const persistConfig = {
  key: 'root',
  storage,
  transforms: [arrayTransform]
}

export const rootReducer = combineReducers({
  partOne: partOneSliceReducer,
  partTwo: partTwoSliceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
