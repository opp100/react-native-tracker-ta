/*
 * Created on Sun Jun 17 2018
 *
 * Copyright (c) 2018 Youke Xiang
 */

import React from 'react';

import {Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import BaseDialog from './BaseDialog';
import PickerView from './PickerView';
import {I18n, Constraints} from '../../Utilities';

class SinglePicker extends BaseDialog {
    constructor(props) {
        super(props);
    }

    _getContentPosition() {
        return {justifyContent: 'flex-end', alignItems: 'center'};
    }

    renderPicker() {
        return (
            <View
                style={{
                    width: this.screenWidth
                }}>
                <PickerView
                    list={this.props.list}
                    onPickerSelected={(toValue) => {
                        // console.warn(toValue);
                    }}
                    selectedIndex={0}
                    fontSize={this.getSize(14)}
                    itemWidth={this.screenWidth}
                    itemHeight={this.getSize(25)}
                />
            </View>
        );
    }

    renderContent() {
        const {language, theme} = this.props;
        const themeColor = Constraints.Themes.get(theme);

        return (
            <SafeAreaView
                style={{
                    height: this.props.itemHeight * 6 + this.getSize(15) + this.getSize(30),
                    width: this.screenWidth,
                    backgroundColor: themeColor.background.toHex()
                }}>
                <View
                    style={{
                        width: this.screenWidth,
                        height: this.props.itemHeight * 5 + this.getSize(15),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: this.props.itemHeight
                    }}>
                    {this.renderPicker()}
                </View>
                <SafeAreaView
                    style={{
                        width: this.screenWidth,
                        height: this.getSize(30),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        top: 0
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.dismiss(() => {
                                this.props.onPickerCancel && this.props.onPickerCancel();
                            });
                        }}
                        style={{
                            width: this.getSize(60),
                            height: this.getSize(44),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text
                            style={{
                                fontSize: this.props.cancelTextSize,
                                fontWeight: '400',
                                color: themeColor.textDark.toHex()
                            }}>
                            {I18n.t('buttons', this.props.cancelText, {locale: language})}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.dismiss(() => {
                                this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.selectedValue);
                            });
                        }}
                        style={{
                            width: this.getSize(60),
                            height: this.getSize(44),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text
                            style={{
                                fontSize: this.props.confirmTextSize,
                                fontWeight: '400',
                                color: themeColor.textDark.toHex()
                            }}>
                            {I18n.t('buttons', this.props.confirmText, {locale: language})}
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        );
    }
}

SinglePicker.defaultProps = {
    list: ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9'],
    confirmText: 'Select',
    confirmTextSize: 14,
    cancelText: 'Cancel',
    cancelTextSize: 14,
    itemHeight: 30,
    onPickerCancel: null,
    onPickerConfirm: null,
    removeSubviews: false
};

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme
    };
};

export default connect(
    mapStateToProps,
    null,
    null,
    {withRef: true}
)(SinglePicker);
