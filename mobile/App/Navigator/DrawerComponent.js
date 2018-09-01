/*
 * Created on Sun May 20 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import React from 'react';
import {MyStyleSheet} from '../Utilities';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import I18n from 'react-native-i18n';

const DrawerComponent = (props) => {
    const {language, theme} = props;
    const styles = MyStyleSheet.get(theme);

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
                <Text style={styles.titleText}>{I18n.t('appName', {locale: language})}</Text>
                <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
    );
};

/**
 *
 * @param {*} props the props from react-navigation
 */
const DrawerItems = ({
    theme,
    language,
    items,
    activeItemKey,
    activeTintColor,
    activeBackgroundColor,
    inactiveTintColor,
    inactiveBackgroundColor,
    getLabel,
    renderIcon,
    onItemPress,
    itemsContainerStyle,
    itemStyle,
    labelStyle,
    activeLabelStyle,
    inactiveLabelStyle,
    iconContainerStyle,
    drawerPosition
}) => {
    const styles = MyStyleSheet.get(theme);
    return (
        <View style={[styles.flexBox, itemsContainerStyle]}>
            {items.map((route, index) => {
                const focused = activeItemKey === route.key;
                const color = focused ? activeTintColor : inactiveTintColor;
                const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
                const scene = {route, index, focused, tintColor: color};
                const icon = renderIcon(scene);
                const label = getLabel(scene);
                const extraLabelStyle = focused ? activeLabelStyle : inactiveLabelStyle;
                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={() => {
                            onItemPress({route, focused});
                        }}
                        delayPressIn={0}>
                        <SafeAreaView
                            style={{backgroundColor}}
                            forceInset={{
                                [drawerPosition]: 'always',
                                [drawerPosition === 'left' ? 'right' : 'left']: 'never',
                                vertical: 'never'
                            }}>
                            <View style={[styles.drawerItem, itemStyle]}>
                                {icon ? (
                                    <View
                                        style={[
                                            styles.icon,
                                            focused ? null : styles.inactiveIcon,
                                            iconContainerStyle
                                        ]}>
                                        {icon}
                                    </View>
                                ) : null}
                                {typeof label === 'string' ? (
                                    <Text style={[styles.drawerLabel, {color}, labelStyle, extraLabelStyle]}>
                                        {I18n.t(`navigator.${label}`, {locale: language})}
                                    </Text>
                                ) : (
                                    label
                                )}
                            </View>
                        </SafeAreaView>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

DrawerItems.defaultProps = {
    activeTintColor: '#000',
    activeBackgroundColor: 'rgba(0, 0, 0, .04)',
    inactiveTintColor: 'rgba(0, 0, 0, .87)',
    inactiveBackgroundColor: 'transparent'
};

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme
    };
};

export default connect(mapStateToProps)(DrawerComponent);
