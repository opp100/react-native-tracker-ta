/*
 * Created on Sun Jun 03 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';

import {Animated, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {BaseComponent} from '../../Utilities';

class BaseDialog extends BaseComponent {
    _path = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
            _isShow: false
        };
    }

    isShowing() {
        return this.state._isShow;
    }

    show(callback, state = {}) {
        this.setState({_isShow: true, ...state}, () => {
            if (!this.props.animationType || this.props.animationType == 'spring') {
                Animated.spring(this._path, {toValue: 1}).start(() => {
                    callback && callback();
                });
            } else {
                Animated.timing(this._path, {toValue: 1}).start(() => {
                    callback && callback();
                });
            }
        });
    }

    dismiss(callback) {
        Animated.timing(this._path, {toValue: 0, duration: 200}).start(() => {
            this.setState({_isShow: false}, () => {
                callback && callback();
            });
        });
    }

    _getContentInterpolate(path) {
        return [
            {
                translateY: path.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [this.getSize(150), this.getSize(150), 0]
                })
            }
        ];
    }

    _getContentPosition() {
        return {justifyContent: 'center', alignItems: 'center'};
    }

    renderContent() {
        return null;
    }

    render() {
        if (this.state._isShow || (this.props && this.props.removeSubviews === false)) {
            return (
                <Modal
                    visible={this.state._isShow}
                    transparent={true}
                    animationType={'none'}>
                    <Animated.View
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                opacity: this._path.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [0, 1, 1]
                                }),
                                ...this._getContentPosition(),
                                transform: [
                                    {
                                        translateX: this._path.interpolate({
                                            inputRange: [0, 0.01, 1],
                                            outputRange: [-this.screenWidth, 0, 0]
                                        })
                                    }
                                ]
                            }
                        ]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.props.cancelable) {
                                    this.dismiss(this.props.onCoverPress);
                                }
                            }}
                            style={{position: 'absolute', width: this.screenWidth, height: this.screenHeight}}
                        />
                        <Animated.View
                            style={{
                                opacity: this._path.interpolate({inputRange: [0, 0.5, 1], outputRange: [0, 0, 1]}),
                                transform: this._getContentInterpolate(this._path)
                            }}>
                            {this.renderContent()}
                        </Animated.View>
                    </Animated.View>
                </Modal>
            );
        }
        return null;
    }
}

BaseDialog.defaultProps = {
    removeSubviews: true,
    cancelable: true,
    onCoverPress: null,
    animationType: 'spring'
};

export default BaseDialog;
