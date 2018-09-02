/*
 * Created on Sun Sep 02 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import {MyStyleSheet, BaseComponent, SocketHelper} from '../../Utilities';
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
    }

    initSocket() {
        this.sh = new SocketHelper();
        const {clientId} = this.props;
        this.sh.init(clientId);
    }

    _onSendMessage() {
        const data = {
            target: 774936,
            message: 'hello',
            type: 'general'
        };
        this.sh.send(data);
    }

    render() {
        const {language, theme, clientId} = this.props;
        const styles = MyStyleSheet.get(theme);
        const themeColor = MyStyleSheet.getThemeColor(theme);
        return (
            <View style={styles.flexBox}>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Text>Your Client Id: {clientId}</Text>
                        <Button
                            text="SendMessage"
                            color={themeColor.info.toHex()}
                            onPress={() => this._onSendMessage()}
                        />
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
        clientId: state.socket.clientId
    };
};

const mapStateToDispatch = (dispatch) => ({});

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Tracker);
