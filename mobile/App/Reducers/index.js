/*
 * Created on Sun May 06 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {AppNavigator} from '../Navigator/AppNavigator';

const navReducer = createNavigationReducer(AppNavigator);

export const appReducer = combineReducers({
    nav: navReducer,
    settings: require('./Settings').reducer,
    popups: require('./Popups').reducer,
    badge: require('./Badge').reducer
});
