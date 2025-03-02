import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from "./userSlice.ts";
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {taskReducer} from "./taskSlice.ts";
import {stagesReducer} from "./stagesSlice.ts";

const userPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user']
};

const rootReducer = {
    users: persistReducer(userPersistConfig, usersReducer),
    tasks: taskReducer,
    stages: stagesReducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;