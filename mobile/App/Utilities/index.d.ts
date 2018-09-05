/*
 * Created on Sun May 27 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import * as React from 'react';
import * as _Constraints from './Constraints';
export interface IMyStyleSheet {
    Dimensions?: Object;
    get(theme: String): Object;
    getThemeColor(theme: String): _Constraints.IColors;
    getAdjustHeight(number: Number): Object;
}
export declare const MyStyleSheet: IMyStyleSheet;

declare class Options {
    locale: 'zh' | 'en';
}
export interface II18n {
    t(prefix: string, scope?: string, options?: Options): string;
}
export declare const I18n: II18n;

export class BaseComponent<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
    screenWidth?: number;
    screenHeight?: number;
    screenSize?: number;
    onePixel?: number;
    getSize(): number;
}

export interface IConstraints {
    Themes?: _Constraints.ITheme;
    StorageKeys?: _Constraints.IStorageKeys;
}

export declare const Constraints: IConstraints;

export class SocketHelper {
    init(clientId?: number): void;
    register(clientId: number): void;
    reconnect(): void;
    send(msg: string): void;
    processMsg(msg: string): void;
}