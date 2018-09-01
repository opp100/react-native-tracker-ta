import React from 'react';
import {Text, Picker, SafeAreaView, View} from 'react-native';
import {connect} from 'react-redux';
import SettingsActions from '../Reducers/Settings';
import I18n from 'react-native-i18n';
import {MyStyleSheet, BaseComponent} from '../Utilities';
import CacheStore from 'react-native-cache-store';
import {Button, FontAwesome, Badge} from '../UIWidgets';
class Settings extends BaseComponent {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <View>
                <Badge label={0} size="small" badgeKey="SettingsBadge" />
                <FontAwesome size={MyStyleSheet.getAdjustHeight(26)} type={'solid'} color={tintColor} name={'cog'} />
            </View>
        )
    };
    render() {
        const {language, changeLanguage, changeTheme, theme} = this.props;
        const {setParams} = this.props.navigation;
        const styles = MyStyleSheet.get(theme);
        const themeColor = MyStyleSheet.getThemeColor(theme);

        const languageOptions = Object.keys(I18n.translations).map((lang, i) => {
            return (
                <Picker.Item
                    key={i}
                    color={themeColor.textDark.toHex()}
                    label={I18n.translations[lang].id}
                    value={lang}
                />
            );
        });
        return (
            <SafeAreaView style={styles.container}>
                <Text style={[styles.titleText, styles.textDark]}>
                    {I18n.t('settings.language', {locale: language})}
                </Text>
                <Picker
                    selectedValue={language}
                    onValueChange={this._languageChanged(changeLanguage, setParams)}>
                    {languageOptions}
                </Picker>
                <Button
                    text="ChangeTheme"
                    color={themeColor.primary.toHex()}
                    onPress={() => this._onColorChangePress(changeTheme)}
                />
            </SafeAreaView>
        );
    }

    _onColorChangePress = (changeTheme) => {
        changeTheme();
    };

    _languageChanged = (changeLanguage, setParams) => (newLang) => {
        changeLanguage(newLang);
        CacheStore.set('SETTINGS_LANGUAGE', newLang);
        setParams({
            title: I18n.t('settings.title', {locale: newLang})
        });
    };
}

const mapStateToProps = (state) => {
    return {
        language: state.settings.language,
        theme: state.settings.theme
    };
};

const mapStateToDispatch = (dispatch) => ({
    changeLanguage: (newLang) => dispatch(SettingsActions.changeLanguage(newLang)),
    changeTheme: () => dispatch(SettingsActions.changeTheme())
});

export default connect(
    mapStateToProps,
    mapStateToDispatch
)(Settings);
