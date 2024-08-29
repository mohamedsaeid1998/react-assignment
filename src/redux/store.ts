import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { AuthenticationApiSlice } from "./services/Authentication/AuthSlice"
import { ProductsApiSlice } from "./services/Products/ProductsSlice"

const store = configureStore({
  reducer: {
    [AuthenticationApiSlice.reducerPath]: AuthenticationApiSlice.reducer,
    [ProductsApiSlice.reducerPath]: ProductsApiSlice.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat([AuthenticationApiSlice.middleware, ProductsApiSlice.middleware]),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
