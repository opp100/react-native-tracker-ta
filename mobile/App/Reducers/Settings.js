/*
 * Created on Sun May 16 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import {createReducer, createActions} from 'reduxsauce';
import I18n from 'react-native-i18n';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
    changeLanguage: ['language'],
    changeTheme: ['theme']
});

export const SettingsTypes = Types;
export default Creators;

// using immutable to improve performance and makes copies of dynamically allocated memory 
export const INITIAL_STATE = Immutable({
    language: I18n.locale.substr(0, 2),
    theme: 'default'
});

export const changeLanguage = (state, {language}) => {
    /*
    // if you dont have immutable do this:
    state.language = language;
    return state; 
    */
    return state.merge({language});
};

export const changeTheme = (state, {theme}) => {
    theme = state.theme == 'gray' ? 'default' : 'gray';
    return state.merge({theme});
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LANGUAGE]: changeLanguage,
    [Types.CHANGE_THEME]: changeTheme
});
