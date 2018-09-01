/*
 * Created on Sun May 20 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
    resetMessage: [],
    showToast: ['message', 'duration'],
    showAlert: ['message', 'onPress'],
    showHeaderMessage: ['message', 'duration', 'backgroundType']
});

export const SettingsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({});

export const showToast = (state, {message, duration = 3000}) => {
    return state.merge({type: 'toast', message, duration});
};

export const showAlert = (state, {message, onPress}) => {
    return state.merge({type: 'alert', message, onPress});
};

export const showHeaderMessage = (state, {message, duration, backgroundType}) => {
    return state.merge({type: 'header_message', message, duration, backgroundType});
};

// reset message after popup shown, it will make the next message available
export const resetMessage = (state) => {
    return state.without('message');
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.RESET_MESSAGE]: resetMessage,
    [Types.SHOW_TOAST]: showToast,
    [Types.SHOW_ALERT]: showAlert,
    [Types.SHOW_HEADER_MESSAGE]: showHeaderMessage
});
