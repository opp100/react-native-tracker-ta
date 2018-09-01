/*
 * Created on Sat May 05 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';
import {connect} from 'react-redux';
import {reduxifyNavigator, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {StackNavigator, createBottomTabNavigator} from 'react-navigation';
import TabBarComponent from './TabBarComponent';
import HeaderTitle from './HeaderTitle';
import HeaderLeft from './HeaderLeft';
import Header from './Header';
import LoadingScreen from '../Components/LoadingScreen';
import ScreenA from '../Components/ScreenA';
import Settings from '../Components/Settings';
/*
const Drawer = DrawerNavigator(
    {
        ScreenA: {
            screen: ScreenA
        },
        Settings: {
            screen: Settings
        }
    },
    {
        contentComponent: DrawerComponent
    }
);
*/

const _TabNavigator = createBottomTabNavigator(
    {
        ScreenA: {
            screen: ScreenA
        },
        Settings: {
            screen: Settings
        }
    },
    {
        tabBarComponent: TabBarComponent,
        tabBarPosition: 'bottom'
    }
);

export const AppNavigator = StackNavigator(
    {
        LoadingScreen: {
            screen: LoadingScreen
        },
        TabNavigator: {
            screen: _TabNavigator
        }
    },
    {
        initialRouteName: 'LoadingScreen', //default screen
        headerMode: 'float',
        navigationOptions: (props) => ({
            header: (props) => <Header {...props} />,
            headerLeft: <HeaderLeft {...props} />,
            headerTitle: <HeaderTitle {...props} />
        })
    }
);
// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const middleware = createReactNavigationReduxMiddleware('root', (state) => state.nav);

const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = (state) => ({
    state: state.nav
});
export const AppWithNavigationState = connect(mapStateToProps)(App);
