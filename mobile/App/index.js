import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import './I18n';
import {AppWithNavigationState, middleware} from './Navigator/AppNavigator';
import {appReducer} from './Reducers';
import {RootView} from './UIWidgets';
const store = createStore(appReducer, applyMiddleware(middleware));

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootView style={{flex:1}}>
                    <AppWithNavigationState />
                </RootView>
            </Provider>
        );
    }
}

module.exports = Root;
