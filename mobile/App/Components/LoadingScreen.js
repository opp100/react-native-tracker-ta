/*
 * Created on Sat May 05 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import CacheStore from 'react-native-cache-store';

import {MyStyleSheet, BaseComponent} from '../Utilities';
import Spinner from 'react-native-spinkit';

import SettingsActions from '../Reducers/Settings';
import SocketActions from '../Reducers/Socket';
import NavigationHelper from '../Utilities/Helpers/NavigationHelper';

class LoadingScreen extends BaseComponent {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        super.componentDidMount();
        this.initApp();
    }

    initApp() {
        setTimeout(async () => {
            const {changeLanguage, storeClientId} = this.props;
            // load values
            const language = await CacheStore.get('SETTINGS_LANGUAGE');
            const clientId = await CacheStore.get('SOCKET_CLIENT_ID');

            // set value to redux state
            if (language) changeLanguage(language);
            if (clientId) storeClientId(clientId);

            NavigationHelper.resetTo(this, 'TabNavigator');
        }, 500);
    }

    render() {
        const {theme} = this.props;
        const styles = MyStyleSheet.get(theme);
        return (
            <SafeAreaView style={styles.flexBox}>
                <View style={[styles.container, styles.center]}>
                    <Text style={styles.textLarge}>Loading...</Text>
                    <Spinner
                        style={styles.spinner}
                        size={this.getSize(20)}
                        type={'Wave'}
                        color={MyStyleSheet.getThemeColor(theme).textDark.toHex()}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme
    };
};

const mapStateToDispatch = (dispatch) => ({
    changeLanguage: (newLang) => dispatch(SettingsActions.changeLanguage(newLang)),
    storeClientId: (id) => dispatch(SocketActions.storeClientId(id))
});

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(LoadingScreen);
