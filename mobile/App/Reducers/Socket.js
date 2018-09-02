/*
 * Created on Sun May 16 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
    connect: ['language'],
});

export const SettingsTypes = Types;
export default Creators;

// using immutable to improve performance and makes copies of dynamically allocated memory 
export const INITIAL_STATE = Immutable({
    language: I18n.locale.substr(0, 2),
});

export const connect = (state, {ws}) => {
    /*
    // if you dont have immutable do this:
    state.language = language;
    return state; 
    */
    return state.merge({ws});
};


export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LANGUAGE]: connect,
});
