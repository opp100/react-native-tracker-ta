/*
 * Created on Sat May 26 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';
import {View, Animated} from 'react-native';
import {BaseComponent} from '../Utilities';
import {connect} from 'react-redux';

class Badge extends BaseComponent {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(1);
    }

    UNSAFE_componentWillReceiveProps({_updateBadgeKey}) {
        if (this.props.badgeKey == _updateBadgeKey) {
            this._spring();
        }
    }

    _spring() {
        this.springValue = new Animated.Value(0.9);
        Animated.spring(this.springValue, {
            toValue: 1,
            friction: 5
        }).start();
    }

    render() {
        let {backgroundColor, fontSize, labels, textColor, size, badgeKey} = this.props;
        let _height = parseInt(this.screenHeight / 30);

        if (size == 'small') _height = parseInt(_height * 0.85);
        else if (size == 'large') _height = parseInt(_height * 1.1);

        let label = labels[badgeKey] || this.props.label;

        if (label == 0) {
            _height = parseInt(this.screenHeight / 80);
        }

        let _fontSize = parseInt(_height / 1.5);
        let _borderRadius = parseInt(_height / 2);

        if (label === undefined) {
            return null;
        }

        return (
            <View
                {...this.props}
                style={{
                    position: 'absolute',
                    right: -_borderRadius,
                    top: -_borderRadius,
                    zIndex: 999
                }}>
                <Animated.View
                    style={{
                        borderRadius: _borderRadius,
                        height: _height,
                        minWidth: _height,
                        backgroundColor: backgroundColor || '#ff3b30',
                        justifyContent: 'center',
                        transform: [{scale: this.springValue}],
                        paddingHorizontal: _height * 0.2
                    }}>
                    <Animated.Text
                        style={{
                            color: textColor || '#fff',
                            alignSelf: 'center',
                            fontSize: fontSize || _fontSize
                        }}>
                        {label || ''}
                    </Animated.Text>
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme,
        labels: state.badge.labels,
        _updateBadgeKey: state.badge._updateBadgeKey
    };
};

export default connect(mapStateToProps)(Badge);
