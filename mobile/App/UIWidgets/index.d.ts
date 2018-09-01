/*
 * Created on Sun May 27 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */
import {ReactNode, Component} from 'react';
import {TouchableOpacityProps, ImageSourcePropType, TextProps, StyleProp} from 'react-native';
import {BaseComponent} from '../Utilities';
import {FontAwesome} from './FontAwesomeJs';

export interface ButtonProps extends TouchableOpacityProps {
    text?: string;
    image?: ImageSourcePropType;
    children: ReactNode;
}

export class Button extends BaseComponent<ButtonProps> {}

export interface BadgeProps {
    badgeKey?: string;
    label?: string;
    size?: string;
    textColor?: string;
    fontSize?: string;
    backgroundColor?: string;
}

export class Badge extends BaseComponent<BadgeProps> {}

export interface FontAwesomeProps {
    name?: string;
    size?: string;
    color?: string;
    type?: 'regular' | 'solid' | 'brands';
    containerStyle?: StyleProp;
    iconStyle?: StyleProp;
}

export class FontAwesome extends Component<FontAwesomeProps> {}

export class KeyboardSpacer  {}