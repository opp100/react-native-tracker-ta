/*
 * Created on Sun May 13 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import AppConfig from './AppConfig';
import Themes from './Themes';
import StorageKeys from './StorageKeys';

export default class Constraints {
    static get Themes() {
        return Themes;
    }
    static get AppConfig() {
        return AppConfig;
    }
    static get StorageKeys() {
        return StorageKeys;
    }
}
