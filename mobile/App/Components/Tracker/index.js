/*
 * Created on Sun Sep 02 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import {MyStyleSheet, BaseComponent, DeviceHelper} from '../../Utilities';
import {connect} from 'react-redux';
import {Button, FontAwesome, Badge} from '../../UIWidgets';
import PopupActions from '../../Reducers/Popups';
import BadgeActions from '../../Reducers/Badge';
import SinglePicker from '../../UIWidgets/Popups/SinglePicker';
import InputDialog from '../../UIWidgets/Popups/InputDialog';

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
        DeviceHelper.initSocket();
    }

    _onInputDialogPress() {
        this.refs['InputDialog'].getWrappedInstance().show();
    }

    render() {
        const {language, theme} = this.props;
        const styles = MyStyleSheet.get(theme);
        const themeColor = MyStyleSheet.getThemeColor(theme);
        return (
            <View style={styles.flexBox}>
                <SafeAreaView style={styles.container}>
                    <ScrollView />
                    <SinglePicker ref={'SinglePicker'} cancelable />
                    <InputDialog ref={'InputDialog'} cancelable />
                </SafeAreaView>
            </View>
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
    showToast: (message) => dispatch(PopupActions.showToast(message)),
    showAlert: (message, onPress) => dispatch(PopupActions.showAlert(message, onPress)),
    showHeaderMessage: (message, duration, backgroundType) =>
        dispatch(PopupActions.showHeaderMessage(message, duration, backgroundType)),
    updateBadgeLabel: (label, key) => dispatch(BadgeActions.updateLabel(label, key)),
    deleteAllBadgeLabel: (label, key) => dispatch(BadgeActions.deleteAllLabel(label, key))
});

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Tracker);
