/*
 * Created on Sun May 13 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import Color from '../Classes/Color';

const _themes = {
    default: {
        black: new Color('#2b2b2b'),
        white: new Color('#fff'),
        primary: new Color('#007bff'),
        secondary: new Color('#6c757d'),
        success: new Color('#28a745'),
        danger: new Color('#dc3545'),
        warning: new Color('#ffc107'),
        info: new Color('#17a2b8'),
        textLight: new Color('#fff'),
        textDark: new Color('#000'),
        background: new Color('#fff'),
        secondaryBackground: new Color('#ccc')
    },
    gray: {
        black: new Color('#000'),
        white: new Color('#fff'),
        primary: new Color('#555'),
        secondary: new Color('#888'),
        success: new Color('#28a745'),
        danger: new Color('#dc3545'),
        warning: new Color('#ffc107'),
        info: new Color('#17a2b8'),
        textLight: new Color('#eee'),
        textDark: new Color('#ccc'),
        background: new Color('#2b2b2b'),
        secondaryBackground: new Color('#ccc')
    }
};

export default class Themes {
    static get(theme = 'default') {
        return _themes[theme];
    }
}
