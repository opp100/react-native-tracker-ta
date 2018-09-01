/*
 * Created on Sun May 06 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import {StyleSheet, Dimensions, Platform} from 'react-native';
import Constraints from './Constraints';

const {height, width} = Dimensions.get('screen');

let _height = height;
let _width = width;
let _screenSize;
/**
 * Put all styles here , and you will get dynamic dimension
 * @param {int} height Height of screen
 * @param {int} width Width of screen
 * @return {object} object for stylesheet
 */
const styles = (theme = 'default', height = _height, width = _width) => {
    const themeColor = Constraints.Themes.get(theme);
    return {
        container: {
            flex: 1,
            backgroundColor: themeColor.background.toHex()
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        },
        flexBox: {
            flex: 1
        },
        header: {
            backgroundColor: themeColor.primary.toHex()
        },
        headerTitle: {
            fontSize: Platform.OS === 'ios' ? parseInt(_screenSize / 39) : parseInt(_screenSize / 45),
            fontWeight: Platform.OS === 'ios' ? '400' : '200',
            color: themeColor.textLight.toHex(),
            textAlign: Platform.OS === 'ios' ? 'center' : 'left',
            marginHorizontal: parseInt(_screenSize / 40)
        },
        loadingText: {
            fontSize: parseInt(_screenSize / 30),
            color: themeColor.textDark.toHex()
        },
        titleText: {
            fontSize: parseInt(_screenSize / 38),
            color: themeColor.textDark.toHex(),
            marginVertical: parseInt(height / 60),
            marginHorizontal: parseInt(width / 60)
        },
        drawerLabel: {
            fontSize: parseInt(_screenSize / 40),
            color: themeColor.textDark.toHex(),
            margin: parseInt(height / 60)
        },
        textLight: {
            color: themeColor.textLight.toHex()
        },
        textDark: {
            color: themeColor.textDark.toHex()
        },
        textSmall: {
            fontSize: parseInt(_screenSize / 40)
        },
        textMedium: {
            fontSize: parseInt(_screenSize / 35)
        },
        textLarge: {
            fontSize: parseInt(_screenSize / 30)
        },
        textCenter: {
            textAlign: 'center',
            justifyContent: 'center',
            alignSelf: 'center'
        },
        spaceLeft: {
            marginLeft: parseInt(width / 50)
        },
        btnActive: {
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            paddingHorizontal: parseInt(width / 30),
            paddingVertical: parseInt(height / 100),
            backgroundColor: 'transparent',
            borderRadius: parseInt(_screenSize / 150)
        },
        btnDisabled: {
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            paddingHorizontal: parseInt(width / 30),
            paddingVertical: parseInt(height / 100),
            backgroundColor: '#aaa',
            borderRadius: parseInt(_screenSize / 150)
        },
        row: {
            flexDirection: 'row'
        },
        tabLabel: {
            textAlign: 'center',
            backgroundColor: 'transparent',
            fontSize: parseInt(_screenSize / 80),
            marginBottom: 1.5
        },
        tabBar: {
            backgroundColor: '#F7F7F7', // Default background color in iOS 10
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: 'rgba(0, 0, 0, .3)',
            flexDirection: 'row'
        },
        tabBarIcon: {
            height: MyStyleSheet.getAdjustHeight(28),
            margin: parseInt(_screenSize / 150)
        },
        tabBarIconText: {
            fontSize: MyStyleSheet.getAdjustHeight(28)
        }
    };
};

class MyStyleSheet {
    /**
     * @param  {String} theme Theme name
     * @return {object} react native stylesheet
     */
    static get(theme) {
        return StyleSheet.create(styles(theme));
    }
    /**
     * @param  {String} theme Theme name
     * @return {object} Theme colors
     */
    static getThemeColor(theme) {
        return Constraints.Themes.get(theme);
    }
    /**
     * @param  {object} {height,width} A object contains height and width
     */
    static set Dimensions({height, width, screenSize}) {
        _height = height;
        _width = width;
        _screenSize = screenSize;
        styles(undefined, height, width);
    }

    static getAdjustHeight(number) {
        const adjustHeight = _height < _width ? 1.5 : 1;
        
        return parseInt((_height / number) * adjustHeight);
    }
}

export default MyStyleSheet;
