import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'users',
    whitelist: ['isLoggedIn', 'userInfo']
};

const appPersisConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
}

export default (history) => combineReducers({
    router: connectRouter(history),
    users: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersisConfig, appReducer)
})