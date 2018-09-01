/* 
 * Invoked from https://github.com/shyaniv7/react-native-fontawesome-pro
 * And rewrite by Youke Xiang
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import _FontAwesome from '@fortawesome/fontawesome';
import {prefixTypes} from './Config';

const DEFAULT_ICON = 'question-circle';

class FontAwesome extends Component {
    render() {
        const {name, size, color, type, containerStyle, iconStyle} = this.props;
        const prefix = prefixTypes[type];
        let icon = _FontAwesome.findIconDefinition({prefix, iconName: name});

        if (!icon) {
            icon = _FontAwesome.findIconDefinition({prefix, iconName: DEFAULT_ICON});
        }

        const iconData = icon.icon;
        const path = iconData[4];
        const viewBox = [0, 0, iconData[0], iconData[1]].join(' ');

        return (
            <View style={containerStyle}>
                <Svg height={size} width={size} version="1.1" viewBox={viewBox} x="0" y="0" style={iconStyle}>
                    <Path d={path} fill={color} />
                </Svg>
            </View>
        );
    }
}

FontAwesome.defaultProps = {
    name: '',
    size: 20,
    color: 'black',
    type: 'regular',
    containerStyle: {
        backgroundColor: 'transparent'
    },
    iconStyle: {}
};

export default FontAwesome;
