/*
 * Created on Sun May 16 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
    storeClientId: ['clientId'],
    showMessage: ['message']
});

export const SettingsTypes = Types;
export default Creators;

// using immutable to improve performance and makes copies of dynamically allocated memory
export const INITIAL_STATE = Immutable({
    clientId: undefined
});

export const storeClientId = (state, {clientId}) => {
    return state.merge({clientId});
};

export const showMessage = (state, {message}) => {
    return state.merge({message});
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.STORE_CLIENT_ID]: storeClientId,
    [Types.SHOW_MESSAGE]: showMessage
});
