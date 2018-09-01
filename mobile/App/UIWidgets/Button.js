/*
 * Created on Sat May 05 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {MyStyleSheet, BaseComponent, I18n} from '../Utilities';
import {connect} from 'react-redux';

class Button extends BaseComponent {
    componentDidMount() {
        super.componentDidMount();
    }
    render() {
        const {useDefaultStyle, disabled, color, language, theme} = this.props;
        const styles = MyStyleSheet.get(theme);
        let _useDefaultStyle = useDefaultStyle || true;

        let containerStyle = [styles.btnActive, this.props.style];
        if (color) {
            containerStyle = [...containerStyle, {backgroundColor: color}];
        }
        if (disabled && _useDefaultStyle) {
            containerStyle = [styles.btnDisabled, this.props.style];
        }
        const childView = () => {
            const {children, text, image, tintColor} = this.props;
            const _tintColor = tintColor ? tintColor : '#fff';
            if (text || typeof children == 'string') {
                return (
                    <Text
                        style={[
                            styles.textSmall,
                            {
                                color: _tintColor
                            }
                        ]}>
                        {I18n.t('buttons', `${text || children}`, {locale: language})}
                    </Text>
                );
            } else if (image) {
                return <Image source={image} tintColor={_tintColor} />;
            } else if (children) {
                return <View style={styles.row}>{children}</View>;
            }
        };
        return (
            <TouchableOpacity {...this.props} style={[{alignSelf: 'center'}, containerStyle]} disabled={disabled}>
                <View>{childView()}</View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme
    };
};

export default connect(mapStateToProps)(Button);
