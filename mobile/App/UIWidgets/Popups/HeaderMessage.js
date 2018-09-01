/*
 * Created on Sat Jun 16 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Constraints, BaseComponent, DeviceHelper, MyStyleSheet} from '../../Utilities';
import {I18n} from '../../Utilities';
import FontAwesome from '../FontAwesomeJs';
import {connect} from 'react-redux';
import PopupActions from '../../Reducers/Popups';

class HeaderMessage extends BaseComponent {
    _path = new Animated.Value(0);
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            backgroundType: 'primary'
        };
    }

    UNSAFE_componentWillReceiveProps({popups, language}) {
        const {message, duration, type, backgroundType} = popups;
        if (message && type == 'header_message') {
            let _message = I18n.t('header_message', message, {locale: language}) || message;
            this.show(_message, backgroundType);
            this.props.resetMessage();
            this._timeoutId = setTimeout(() => {
                this.dismiss();
            }, duration || 1500);
        }
    }

    show(message, backgroundType) {
        this._timeoutId && clearTimeout(this._timeoutId);
        this.setState({message: message, backgroundType: backgroundType});
        Animated.timing(this._path, {toValue: 1, duration: 350}).start(() => {});
    }

    dismiss() {
        Animated.timing(this._path, {toValue: 0, duration: 350}).start(() => {
            this.setState({_isShow: false});
        });
    }

    componentWillUnmount() {
        this._timeoutId && clearTimeout(this._timeoutId);
    }

    render() {
        const {backgroundType, message} = this.state;
        const _backgroundColor = Constraints.Themes.get()[backgroundType].toHex();
        const textStyle = {
            color: Constraints.Themes.get().textLight.toHex(),
            fontSize: MyStyleSheet.getAdjustHeight(40),
            marginHorizontal: parseInt(this.screenWidth / 100)
        };

        const statusBarHeight = DeviceHelper.isIPhoneX ? 42 : 20;

        return (
            <Animated.View style={StyleSheet.absoluteFill}>
                <Animated.View
                    style={{
                        flex: 1,
                        backgroundColor: _backgroundColor,
                        paddingHorizontal: parseInt(this.screenWidth / 80),
                        justifyContent: 'center',
                        transform: [
                            {
                                translateY: this._path.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-100, 0]
                                })
                            }
                        ]
                    }}>
                    <Animated.View
                        style={{
                            marginTop: statusBarHeight,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <FontAwesome
                            name="check-circle"
                            color={Constraints.Themes.get().textLight.toHex()}
                            type="regular"
                            size={MyStyleSheet.getAdjustHeight(40)}
                        />
                        <Animated.Text style={textStyle}>{message}</Animated.Text>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        popups: state.popups,
        language: state.settings.language
    };
};

const mapStateToDispatch = (dispatch) => ({
    resetMessage: () => dispatch(PopupActions.resetMessage())
});

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(HeaderMessage);
