/*
 * Created on Sun May 20 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {FontAwesome} from '../UIWidgets';
import {MyStyleSheet, BaseComponent} from '../Utilities';

class HeaderLeft extends BaseComponent {
    render() {
        let {theme} = this.props;
        let styles = MyStyleSheet.get(theme);

        return (
            <View>
                <FontAwesome
                    containerStyle={[styles.spaceLeft, styles.center]}
                    size={this.getSize(22)}
                    type={'brands'}
                    color={MyStyleSheet.getThemeColor(theme).textLight.toHex()}
                    name={'react'}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme
    };
};

export default connect(mapStateToProps)(HeaderLeft);
