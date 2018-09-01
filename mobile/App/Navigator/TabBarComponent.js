/*
 * 
 * invoked from https://github.com/react-navigation/react-navigation-tabs
 * 
 */
import React from 'react';
import {Animated, TouchableWithoutFeedback, View, Platform} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {connect} from 'react-redux';
import CrossFadeIcon from './CrossFadeIcon';
import {BaseComponent, Constraints} from '../Utilities';
import MyStyleSheet from '../Utilities/MyStyleSheet';
import I18n from 'react-native-i18n';
const majorVersion = parseInt(Platform.Version, 10);
const isIos = Platform.OS === 'ios';
const isIOS11 = majorVersion >= 11 && isIos;

class TabBarBottom extends BaseComponent {
    static defaultProps = {
        activeTintColor: '#3478f6', // Default active tint color in iOS 10
        activeBackgroundColor: 'transparent',
        inactiveTintColor: '#929292', // Default inactive tint color in iOS 10
        inactiveBackgroundColor: 'transparent',
        showIcon: true,
        allowFontScaling: true,
        adaptive: isIOS11
    };

    _renderLabel({route, focused}) {
        const {theme, language, labelStyle, allowFontScaling} = this.props;

        if (this.state.orientation == 'LANDSCAPE') {
            // hide the label when landscape
            return null;
        }
        const themeColor = Constraints.Themes.get(theme);
        const label = I18n.t(`navigator.${route.routeName}`, {locale: language});
        const tintColor = focused ? themeColor.primary.toHex() : themeColor.secondary.toHex();
        let styles = MyStyleSheet.get(theme);
        if (typeof label === 'string') {
            return (
                <Animated.Text
                    numberOfLines={1}
                    style={[styles.tabLabel, {color: tintColor}, labelStyle]}
                    allowFontScaling={allowFontScaling}>
                    {label}
                </Animated.Text>
            );
        }

        if (typeof label === 'function') {
            return label({route, focused, tintColor});
        }

        return label;
    }

    _renderIcon({route, focused}) {
        const {navigation, theme, renderIcon, showIcon} = this.props;
        if (showIcon === false) {
            return null;
        }
        const styles = MyStyleSheet.get(theme);
        const themeColor = Constraints.Themes.get(theme);
        const activeOpacity = focused ? 1 : 0;
        const inactiveOpacity = focused ? 0 : 1;
        return (
            <CrossFadeIcon
                route={route}
                navigation={navigation}
                activeOpacity={activeOpacity}
                inactiveOpacity={inactiveOpacity}
                activeTintColor={themeColor.primary.toHex()}
                inactiveTintColor={themeColor.secondary.toHex()}
                renderIcon={renderIcon}
                style={styles.tabBarIcon}
            />
        );
    }

    render() {
        const {navigation, onTabPress, jumpTo, style, tabStyle, theme} = this.props;
        const {routes} = navigation.state;
        const styles = MyStyleSheet.get(theme);
        const themeColor = Constraints.Themes.get(theme);
        const tabBarStyle = [styles.tabBar, style];
        let tabBarHeight = MyStyleSheet.getAdjustHeight(11);

        return (
            <SafeAreaView style={tabBarStyle} forceInset={{bottom: 'always', top: 'never'}}>
                {routes.map((route, index) => {
                    const focused = index === navigation.state.index;
                    const scene = {route, focused};

                    const backgroundColor = focused
                        ? themeColor.secondaryBackground.toHex()
                        : themeColor.background.toHex();

                    return (
                        <TouchableWithoutFeedback
                            key={route.key}
                            onPress={() => {
                                onTabPress({route});
                                jumpTo(route.key);
                            }}>
                            <View
                                style={[
                                    {
                                        flex: 1,
                                        alignItems: isIos ? 'center' : 'stretch',
                                        height: tabBarHeight,
                                        justifyContent:'center'
                                    },
                                    {backgroundColor},
                                    tabStyle
                                ]}>
                                {this._renderIcon(scene)}
                                {this._renderLabel(scene)}
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme
    };
};

export default connect(mapStateToProps)(TabBarBottom);
