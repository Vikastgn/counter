import {combineReducers, legacy_createStore} from 'redux';
import {counterReducer} from "./counter-reducer";

const rootReducer = combineReducers({
    counter: counterReducer
})

export type AppState = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer);

export type AppStoreType = typeof store