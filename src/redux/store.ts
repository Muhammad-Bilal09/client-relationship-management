import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './slice/itemsSlice'
import cartReducer from './slice/cartSlice'
import saleReducer from './slice/salesSlice'
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import forgotPasswordReducer from "./slice/forgotPasswordSlice"
import resetPasswordReducer from './slice/resetPasswordSlice';
import createItemReducer from './slice/createItemSlice';
import settingsReducer from './slice/settingsSlice';
import chartReducer from './slice/chartSlice'
import orderReducer from './slice/orderSlice';
import analyticalReducer from './slice/analyticalSlice';
import documentReducer from './slice/documentSlice';
import storeReducer from './slice/storeSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        item: itemsReducer,
        cart: cartReducer,
        sale: saleReducer,
        auth: authReducer,
        user: userReducer,
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        items: createItemReducer,
        settings: settingsReducer,
        chart: chartReducer, 
        order: orderReducer,
        analytical:analyticalReducer,
        document: documentReducer,
        store:storeReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']