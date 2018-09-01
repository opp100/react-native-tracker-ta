/*
 * Created on Sun Jun 03 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import BaseDialog from './BaseDialog';
import {I18n, Constraints} from '../../Utilities';
import PopupActions from '../../Reducers/Popups';

class AlertDialog extends BaseDialog {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillReceiveProps({popups}) {
        let {message, type, onPress} = popups;
        if (message && type == 'alert') {
            console.warn(this.state._isShow);
            this.setState({message, onPress});
            this.show();
            this.props.resetMessage();
        }
    }

    _getContentPosition() {
        return {justifyContent: 'center', alignItems: 'center'};
    }

    renderContent() {
        const {
            language,
            theme,
            messageTextSize,
            positiveColor,
            positiveSize,
            positiveText,
            negativeColor,
            negativeSize,
            negativeText
        } = this.props;
        const themeColor = Constraints.Themes.get(theme);
        return (
            <View
                style={{
                    height: this.getSize(160),
                    width: this.getSize(230),
                    backgroundColor: themeColor.background.toHex(),
                    borderRadius: this.getSize(10)
                }}>
                <View
                    style={{
                        flex: 1,
                        paddingLeft: 15,
                        paddingRight: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            fontSize: messageTextSize || this.getSize(15),
                            fontWeight: '200',
                            color: themeColor.textDark.toHex(),
                            lineHeight: 20,
                            textAlign: 'center'
                        }}>
                        {I18n.t('alerts', this.state.message, {locale: language})}
                    </Text>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        width: this.getSize(220),
                        height: this.onePixel,
                        backgroundColor: themeColor.secondary.toRGBA(0.3)
                    }}
                />
                <View
                    style={{
                        height: this.getSize(35),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.dismiss(() => {
                                if (this.state.onPress) {
                                    this.state.onPress(true);
                                }
                            });
                        }}
                        style={{
                            flex: 1,
                            height: this.getSize(35),
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text
                            style={{
                                color: positiveColor || themeColor.primary.toHex(),
                                fontSize: positiveSize || this.getSize(15)
                            }}>
                            {positiveText}
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            height: this.getSize(28),
                            width: this.onePixel,
                            backgroundColor: themeColor.secondary.toRGBA(0.3)
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.dismiss(() => {
                                if (this.state.onPress) {
                                    this.state.onPress(false);
                                }
                            });
                        }}
                        style={{
                            flex: 1,
                            height: this.getSize(45),
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text
                            style={{
                                color: negativeColor || themeColor.secondary.toHex(),
                                fontSize: negativeSize || this.getSize(15)
                            }}>
                            {negativeText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

AlertDialog.defaultProps = {
    message: 'Alert Message',
    negativeText: 'Cancel',
    positiveText: 'OK',
    onPress: null
};

const mapStateToProps = (state) => {
    return {
        popups: state.popups,
        language: state.settings.language,
        theme: state.settings.theme
    };
};

const mapStateToDispatch = (dispatch) => ({
    resetMessage: () => dispatch(PopupActions.resetMessage())
});

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(AlertDialog);
