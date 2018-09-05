/*
 * Created on Sun Sep 02 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';
import {Text, View, SafeAreaView, ScrollView, TextInput} from 'react-native';
import {MyStyleSheet, BaseComponent, SocketHelper, BackgroundGeolocationHelper, Constraints} from '../../Utilities';
import {connect} from 'react-redux';
import {Button, FontAwesome, Badge} from '../../UIWidgets';
import CacheStore from 'react-native-cache-store';

class Tracker extends BaseComponent {
    static navigationOptions = {
        tabBarIcon: (props) => {
            let {tintColor} = props;
            return (
                <View>
                    <Badge size="small" badgeKey="TrackerBadge" />
                    <FontAwesome size={MyStyleSheet.getAdjustHeight(26)} color={tintColor} name={'map'} />
                </View>
            );
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            badgeLabel: 0,
            targetClientId: undefined
        };
    }

    async componentDidMount() {
        super.componentDidMount();
        this.initSocket();
        this.initBackgroundTracking();
        this.getTargetClientId();
    }

    async getTargetClientId() {
        const _clientId = await CacheStore.get(Constraints.StorageKeys.TARGET_CLIENT_ID);
        this.setState({targetClientId: _clientId});
    }

    initBackgroundTracking() {
        this.bgh = new BackgroundGeolocationHelper();
        this.bgh.init();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.bgh.clear();
    }

    initSocket() {
        const {clientId} = this.props;
        SocketHelper.init(clientId);
    }

    async _onSendMessage() {
        const _targetClientId = await CacheStore.get(Constraints.StorageKeys.TARGET_CLIENT_ID);
        const data = {
            target: _targetClientId,
            message: 'hello',
            type: 'general'
        };
        SocketHelper.send(data);
    }

    _onTargetTextChange(text) {
        this.setState({targetClientId: text});
        CacheStore.set(Constraints.StorageKeys.TARGET_CLIENT_ID, text);
    }

    render() {
        const {language, theme, clientId, socketMessage} = this.props;
        const styles = MyStyleSheet.get(theme);
        const themeColor = MyStyleSheet.getThemeColor(theme);

        const CoordsLabel = () => {
            if (socketMessage && socketMessage.coords) {
                let lng = socketMessage.coords.longitude;
                let lat = socketMessage.coords.latitude;

                return <Text>{`${lat}, ${lng}`}</Text>;
            }
            return null;
        };

        return (
            <View style={styles.flexBox}>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Text>Your Client ID: {clientId}</Text>
                        <TextInput
                            style={{flex: 1, height: this.getSize(50)}}
                            defaultValue={this.state.targetClientId}
                            placeholder="Target Client ID"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                this._onTargetTextChange(text);
                            }}
                        />
                        <Button
                            text="SendMessage"
                            color={themeColor.info.toHex()}
                            onPress={() => this._onSendMessage()}
                        />
                        <CoordsLabel />
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme,
        clientId: state.socket.clientId,
        socketMessage: state.socket.message
    };
};

const mapStateToDispatch = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Tracker);
