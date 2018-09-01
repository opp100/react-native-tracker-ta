/*
 * Created on Sun May 13 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import AppConfig from './AppConfig';
import Themes from './Themes';

export default class Constraints {
    static get Themes() {
        return Themes;
    }
    static get AppConfig() {
        return AppConfig;
    }
}
