/*
 * Created on Sat May 26 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
    updateLabel: ['label', 'key', '_updateBadgeKey'],
    deleteAllLabel: []
});

export const SettingsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({labels: {}});

export const updateLabel = (state, {label, key}) => {
    let labels = Immutable.asMutable(state.labels); // modify the immutable
    labels[key] = label;
    let _updateBadgeKey = key;
    return state.merge({labels, _updateBadgeKey});
};

export const deleteAllLabel = (state) => {
    let labels = {}; // modify the immutable

    return state.merge({labels});
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_LABEL]: updateLabel,
    [Types.DELETE_ALL_LABEL]: deleteAllLabel
});
