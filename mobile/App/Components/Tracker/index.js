/*
 * Created on Sun Sep 02 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import {MyStyleSheet, BaseComponent, SocketHelper, BackgroundGeolocationHelper} from '../../Utilities';
import {connect} from 'react-redux';
import {Button, FontAwesome, Badge} from '../../UIWidgets';

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
            badgeLabel: 0
        };
    }

    async componentDidMount() {
        super.componentDidMount();
        this.initSocket();
        this.initBackgroundTracking();
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

    _onSendMessage() {
        const data = {
            target: 774936,
            message: 'hello',
            type: 'general'
        };
        SocketHelper.send(data);
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
