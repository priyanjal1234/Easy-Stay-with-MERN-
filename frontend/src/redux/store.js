import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import UserReducer from './reducers/UserReducer'
import RoomReducer from './reducers/RoomReducer'
import BookingReducer from './reducers/BookingReducer'

const persistConfig = {
  key: "root",
  storage, 
};

const rootReducer = combineReducers({
    user: UserReducer,
    room: RoomReducer,
    booking: BookingReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)

export { store,persistor }
 