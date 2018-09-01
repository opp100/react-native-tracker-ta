/*
 * Created on Sun May 20 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import React from 'react';
import {Animated} from 'react-native';
import {MyStyleSheet} from '../Utilities';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';

const AnimatedText = Animated.Text;

const HeaderTitle = ({style, language, theme, ...rest}) => {
    let styles = MyStyleSheet.get(theme);
    return (
        <AnimatedText
            numberOfLines={1}
            {...rest}
            style={[styles.headerTitle, style]}
            accessibilityTraits="header">
            {rest.children ? rest.children : I18n.t('welcome', {locale: language})}
        </AnimatedText>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme
    };
};

export default connect(mapStateToProps)(HeaderTitle);
