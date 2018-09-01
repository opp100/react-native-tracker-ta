import {StackActions, NavigationActions} from 'react-navigation';

class NavigationHelper {
    static indexOf(state, key) {
        return state.routes.findIndex((route) => route.key === key);
    }

    static jumpToIndex(state, index) {
        if (index === state.index) {
            return state;
        }

        return {
            ...state,
            index
        };
    }

    static jumpTo(state, key) {
        const index = NavigationHelper.indexOf(state, key);
        return NavigationHelper.jumpToIndex(state, index);
    }
    
    static resetTo(fromClass, routeName) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: routeName})]
        });
        fromClass.props.navigation.dispatch(resetAction);
    }
}

export default NavigationHelper;
