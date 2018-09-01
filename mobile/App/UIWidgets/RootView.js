import React from 'react';
import Toast from './Popups/Toast';
import AlertDialog from './Popups/AlertDialog';
import {View} from 'react-native';

import {BaseComponent} from '../Utilities';

class RootView extends BaseComponent {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        return (
            <View {...this.props}>
                {this.props.children}
                <Toast />
                <AlertDialog />
            </View>
        );
    }
}

export default RootView;
